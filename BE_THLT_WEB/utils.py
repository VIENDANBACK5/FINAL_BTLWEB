from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from . import models, databases
from sqlalchemy.orm import Session
import os


SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(databases.get_db)):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         user_id_str: str = payload.get("sub") # Mong đợi ID người dùng dưới dạng chuỗi
#         if user_id_str is None:
#             raise credentials_exception
#         try:
#            uid = int(user_id_str)
#     except ValueError:
#         raise credentials_exception
#     user = db.query(models.User).filter(models.User.id == uid).first()

#         # payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         # email: str = payload.get("sub")
#         # if email is None:
#         #     raise credentials_exception
#     # except JWTError:
#     #     raise credentials_exception
#     # user = db.query(models.User).filter(models.User.email == email).first()
#     if user is None:
#         raise credentials_exception
#     return user

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(databases.get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id_str: str = payload.get("sub")  # JWT chứa ID người dùng trong trường "sub"
        if user_id_str is None:
            raise credentials_exception
        uid = int(user_id_str)
    except (JWTError, ValueError):
        raise credentials_exception

    user = db.query(models.User).filter(models.User.id == uid).first()
    if user is None:
        raise credentials_exception
    return user

