from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class UserRegister(BaseModel):
    username: str
    email: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class UserOut(BaseModel):
    id: int
    username: str
    email: str
    bio: str
    avatar: str
    created_at: datetime
    followers_count: int = 0
    following_count: int = 0
    posts_count: int = 0
    is_followed: bool = False


class PostCreate(BaseModel):
    caption: str = ""


class PostOut(BaseModel):
    id: int
    image_url: str
    caption: str
    created_at: datetime
    user_id: int
    username: str
    avatar: str
    likes_count: int = 0
    comments_count: int = 0
    is_liked: bool = False


class CommentCreate(BaseModel):
    text: str


class CommentOut(BaseModel):
    id: int
    text: str
    created_at: datetime
    user_id: int
    username: str
    avatar: str
    post_id: int


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: int
    username: str


class MessageSend(BaseModel):
    receiver_id: int
    text: str


class MessageOut(BaseModel):
    id: int
    sender_id: int
    receiver_id: int
    text: str
    created_at: datetime
    is_read: bool
    sender_username: str
    sender_avatar: str


class ConversationOut(BaseModel):
    user_id: int
    username: str
    avatar: str
    last_message: str
    last_message_at: datetime
    unread_count: int = 0
