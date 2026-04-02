from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter, UploadFile, File, Form
import shutil
import os
from typing import List, Optional
import uuid
from sqlalchemy.orm import Session
from sqlalchemy import func, case, or_
from .. import models
from ..schemas import Post, PostResp, PostOut, PostFeed
from ..oauth2 import get_current_user
from ..db import get_db
import re

router = APIRouter(
    prefix="/posts",
    tags=["Posts"]
)

@router.get("/", response_model= List[PostFeed])
def get_posts(db: Session = Depends(get_db), current_user: int = Depends(get_current_user), limit: int = 10, skip: int = 0, search: Optional[str] = ""):
    # print(current_user.email)
    # feed = db.query(models.Post).filter(models.Post.title.contains(search)).limit(limit).offset(skip).all()
    
    res = db.query(
        models.Post,
        func.count(func.distinct(models.Subscription.user_id)).label("subscribers")
    ).join(
        models.User, models.User.id == models.Post.owner_id, 
        isouter=True
    ).join(
        models.Subscription, models.Subscription.post_id == models.Post.id, 
        isouter=True
    ).group_by(
        models.Post.id
    ).filter(or_(models.Post.title.ilike(f"%{search}%"),
                 models.User.email.ilike(f"%{search}%"))).limit(limit).offset(skip).all()

    return res

@router.get("/{id}", response_model=PostOut)
def get_post(id: int, resp: Response, db: Session = Depends(get_db), current_user: int = Depends(get_current_user)):
    post = db.query(models.Post).filter(models.Post.id == id).first()
    
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post with id {id} not found")
    
    if post.owner_id != current_user.id:
        sub = db.query(models.Subscription).filter(models.Subscription.post_id == post.id, models.Subscription.user_id == current_user.id).first()
        if not sub:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You must subscribe to view this post.")
        
    final_post = db.query(
        models.Post, 
        func.count(func.distinct(models.Subscription.user_id)).label("subscribers")
    ).join(
        models.Subscription, 
        models.Subscription.post_id == models.Post.id, 
        isouter=True
    ).group_by(models.Post.id).filter(models.Post.id == id).first()

    return final_post

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=PostResp)
def create_post(
                title: str = Form(...),
                file: UploadFile = File(...),
                db: Session = Depends(get_db),
                current_user: int = Depends(get_current_user)):
    
    filename = f"{uuid.uuid4()}.pdf"
    file_location = f"pdfs/{filename}"

    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    new_post = models.Post(title = title, content = file_location, owner_id = current_user.id) ##**payload.dict()
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

@router.put("/{id}", response_model=PostResp)
def update_post(id: int,
                title: str = Form(...),
                file: UploadFile | None = File(None),
                db: Session = Depends(get_db),
                current_user: int = Depends(get_current_user)):

    updated_post_query = db.query(models.Post).filter(models.Post.id == id)
    updated_post = updated_post_query.first()
    if not updated_post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post with id {id} not found")
    
    if updated_post.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail= "Not authorized to perfrom this action.")
    
    if file:
        filename = f"{uuid.uuid4()}.pdf"
        filepath = f"pdfs/{filename}"

        old_path = f"{updated_post.content}"
        if os.path.exists(old_path):
            os.remove(old_path)

        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        updated_post.content = filepath

    updated_post.title=title
    db.commit()

    return updated_post_query.first()

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int, db: Session = Depends(get_db), current_user: int = Depends(get_current_user)):
    del_post_query = db.query(models.Post).filter(models.Post.id == id)
    del_post = del_post_query.first()
    if not del_post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post with id {id} not found")
    
    if del_post.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail= "Not authorized to perfrom this action.")

    del_post_query.delete()
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)