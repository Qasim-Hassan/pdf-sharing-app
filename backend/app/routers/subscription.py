from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from ..schemas import Subscription
from .. import models
from ..oauth2 import get_db, get_current_user

router = APIRouter(
    prefix="/subscription",
    tags=["Subscription"]
)

@router.post("/", status_code=status.HTTP_201_CREATED)
def subscribe(sub: Subscription, db: Session = Depends(get_db), current_user: int = Depends(get_current_user)):
    post_query = db.query(models.Post).filter(models.Post.id == sub.post_id).first()
    if not post_query:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Post with id {sub.post_id} not found." )    

    try:
        subs_query = db.query(models.Subscription).filter(models.Subscription.post_id == sub.post_id, models.Subscription.user_id == current_user.id)
        subs_record = subs_query.first()

        if sub.dir == 1:
            if subs_record:
                raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Already subscribed to this post")
            
            new_sub = models.Subscription(post_id = sub.post_id, user_id = current_user.id)
            db.add(new_sub)
            db.commit()

            return {"message": "Subscribed"}
        elif sub.dir == 0:
            if not subs_record:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Subscription not found")
            
            subs_query.delete(synchronize_session=False)
            db.commit()

            return {"message": "Unsubscribed"}
    except Exception as e:
        print(e)
        return {"message": "Error! Can't perform this action"}
    