from fastapi import FastAPI
from . import models
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from .db import engine, Base
from .routers import posts, users, auth, vote, subscription
from .config import settings

# print(settings.db_password)

# Since we're using alembic, we don't need → models.Base.metadata.create_all(bind=engine)
 
origins = [
    "http://localhost:5173",
    "*"
]

app = FastAPI()

app.mount("/pdfs", StaticFiles(directory="pdfs"), name="pdfs")
app.include_router(posts.router)
app.include_router(users.router)
app.include_router(auth.router)
# app.include_router(vote.router)
app.include_router(subscription.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hellow World"}


