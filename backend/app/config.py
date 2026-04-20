from pydantic_settings import BaseSettings
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

class Settings(BaseSettings):
    db_hostname: str
    db_name: str
    db_username: str
    db_password: str
    db_port: str
    db_url: str
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int

    class Config:
        env_file = BASE_DIR / ".env"   

settings = Settings()