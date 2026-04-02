# from typing import Any
# from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
# from sqlalchemy.orm import Session
# from ..schemas import Vote
# from .. import models
# from ..oauth2 import get_db, get_current_user

# router = APIRouter(
#     prefix="/vote",
#     tags=["Vote"]
# )

# @router.post("/", status_code=status.HTTP_201_CREATED)
# def vote(data: Vote, db: Session = Depends(get_db), current_user: Any = Depends(get_current_user)):
#     post_query = db.query(models.Post).filter(models.Post.id == data.post_id).first()
#     if not post_query:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post with id {data.post_id} not found." )
    
#     try:
#         vote_query = db.query(models.Vote).filter(models.Vote.post_id == data.post_id, models.Vote.user_id == current_user.id)
#         found_vote = vote_query.first()
        
#         if data.dir == 1:
#             if found_vote:
#                 raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"User (id: {current_user.id}) already voted on the post (id: {data.post_id})")
            
#             new_vote = models.Vote(user_id = current_user.id, post_id = data.post_id)
#             db.add(new_vote)
#             db.commit()

#             return {"message":"Succesfully added vote."}
#         elif data.dir == 0:
#             if not found_vote:
#                 raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"User (id: {current_user.id}) has no vote on the post (id: {data.post_id})")
            
#             vote_query.delete(synchronize_session=False)
#             db.commit()

#             return {"message":"Succesfully removed the vote."}
#     except RuntimeError as e:
#         print(e)


    