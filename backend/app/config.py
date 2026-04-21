from pydantic_settings import BaseSettings, SettingsConfigDict

#postgresql://<username>:<password>@<ip-address/hostname>/<database-name>

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
        env_file = ".env"

# model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8')

settings = Settings()