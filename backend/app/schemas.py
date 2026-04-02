from pydantic import BaseModel, EmailStr
from fastapi import UploadFile, File, Form
from typing import Optional, Literal
from datetime import datetime

#this is the schema (structure to validate the requests and response data)
class Post(BaseModel):
    title: str
    content: str
    published: bool=True    #optional

class UserOut(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime

    class Config:
        orm_mode = True

class UserBasic(BaseModel):
    id: int
    email: EmailStr

    class Config:
        orm_mode = True

class BasicFeed(BaseModel):
    id: int
    title: str
    owner: UserBasic

    class Config:
        orm_mode = True

class PostResp(Post):
    id: int
    created_at: datetime
    owner: UserBasic

    class Config:
        orm_mode = True

class PostFeed(BaseModel):
    Post: BasicFeed
    subscribers: int

    class Config:
        orm_mode = True       
    
class PostOut(BaseModel):
    Post: PostResp
    subscribers: int

    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    email: EmailStr
    password: str


class Err(BaseModel):
    error: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str 
    token_type: str

class TokenData(BaseModel):
    id: Optional[str] = None

class Vote(BaseModel):
    post_id: int
    dir: Literal[0,1]

class Subscription(BaseModel):
    post_id: int
    dir: Literal[0,1]