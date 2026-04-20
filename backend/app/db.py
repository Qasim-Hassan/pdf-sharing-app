from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from .config import settings

#we have to pass → 'postgresql://<username>:<password>@<ip-address/hostname>/<database-name>'
SQLALCHEMY_DATABASE_URL = f'postgresql://{settings.db_username}:{settings.db_password}@{settings.db_hostname}:{settings.db_port}/{settings.db_name}'
#SQLALCHEMY_DATABASE_URL = f'{settings.db_url}'
engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
    
#Dependency
def get_db(): 
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()