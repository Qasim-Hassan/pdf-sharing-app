from fastapi import APIRouter, Depends, Response, status, HTTPException
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from .. import models
from ..db import get_db
from ..utils import verify
from ..schemas import UserLogin, Token
from ..oauth2 import create_access_token

router = APIRouter(
    prefix="/login",
    tags=["Authentication"]
)

@router.post("/", response_model=Token)
def login(user_cred: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == user_cred.username).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials")
    
    if not verify(user_cred.password, user.password):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials")
    
    access_token = create_access_token({"user_id":user.id})
    
    return { "access_token": access_token , "token_type": "bearer"}