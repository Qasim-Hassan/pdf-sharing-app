from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from .. import models
from ..utils import hash
from ..schemas import UserCreate, UserOut, Err
from ..db import get_db
from ..oauth2 import get_current_user

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=UserOut | Err)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    try:
        #hash the password → user.password

        hashed_pwd = hash(user.password)
        user.password = hashed_pwd
        new_user = models.User(**user.dict())

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return new_user
    except Exception as e:
        return {"error": e}
    
@router.get("/{id}", response_model=UserOut)
def get_user(id: int, db: Session = Depends(get_db), current_user: int = Depends(get_current_user)):
    user = db.query(models.User).filter(models.User.id == id).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id {id} not found")
    
    return user