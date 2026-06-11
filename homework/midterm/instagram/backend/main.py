import os
import uuid
import shutil
from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List

from .database import engine, get_db, Base
from .models import User, Post, Comment, Like, Follow, Message
from .schemas import (
    UserRegister, UserLogin, UserOut, PostCreate, PostOut,
    CommentCreate, CommentOut, Token,
    MessageSend, MessageOut, ConversationOut,
)
from sqlalchemy import or_, and_
from .auth import hash_password, verify_password, create_access_token, get_current_user

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Instagram Clone")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")
app.mount("/frontend", StaticFiles(directory=FRONTEND_DIR), name="frontend")


@app.get("/")
def root():
    return FileResponse(os.path.join(FRONTEND_DIR, "index.html"))


# ─── Auth ───────────────────────────────────────────────────────

@app.post("/api/register", response_model=Token)
def register(data: UserRegister, db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == data.username).first():
        raise HTTPException(status_code=400, detail="Username already taken")
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        username=data.username,
        email=data.email,
        hashed_password=hash_password(data.password)
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token({"user_id": user.id, "username": user.username})
    return Token(access_token=token, user_id=user.id, username=user.username)


@app.post("/api/login", response_model=Token)
def login(data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == data.username).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"user_id": user.id, "username": user.username})
    return Token(access_token=token, user_id=user.id, username=user.username)


# ─── Users ──────────────────────────────────────────────────────

@app.get("/api/users/me", response_model=UserOut)
def get_me(current_user: User = Depends(get_current_user)):
    return _user_to_out(current_user, current_user.id)


@app.get("/api/users/{user_id}", response_model=UserOut)
def get_user(user_id: int, db: Session = Depends(get_db),
             current_user: User = Depends(get_current_user)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return _user_to_out(user, current_user.id)


@app.put("/api/users/me")
def update_profile(
    bio: str = Form(""),
    avatar: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if avatar:
        ext = os.path.splitext(avatar.filename)[1] or ".jpg"
        filename = f"{uuid.uuid4()}{ext}"
        filepath = os.path.join(UPLOAD_DIR, filename)
        with open(filepath, "wb") as f:
            shutil.copyfileobj(avatar.file, f)
        current_user.avatar = f"/uploads/{filename}"

    current_user.bio = bio
    db.commit()
    return {"message": "Profile updated"}


@app.get("/api/users/search/{query}", response_model=List[UserOut])
def search_users(query: str, db: Session = Depends(get_db),
                 current_user: User = Depends(get_current_user)):
    users = db.query(User).filter(User.username.contains(query)).all()
    return [_user_to_out(u, current_user.id) for u in users]


# ─── Follow ─────────────────────────────────────────────────────

@app.post("/api/follow/{user_id}")
def follow_user(user_id: int, db: Session = Depends(get_db),
                current_user: User = Depends(get_current_user)):
    if user_id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot follow yourself")
    target = db.query(User).filter(User.id == user_id).first()
    if not target:
        raise HTTPException(status_code=404, detail="User not found")

    existing = db.query(Follow).filter(
        Follow.follower_id == current_user.id,
        Follow.followed_id == user_id
    ).first()
    if not existing:
        db.add(Follow(follower_id=current_user.id, followed_id=user_id))
        db.commit()
    return {"message": "Followed"}


@app.delete("/api/follow/{user_id}")
def unfollow_user(user_id: int, db: Session = Depends(get_db),
                  current_user: User = Depends(get_current_user)):
    existing = db.query(Follow).filter(
        Follow.follower_id == current_user.id,
        Follow.followed_id == user_id
    ).first()
    if existing:
        db.delete(existing)
        db.commit()
    return {"message": "Unfollowed"}


# ─── Posts ──────────────────────────────────────────────────────

@app.post("/api/posts", response_model=PostOut)
def create_post(
    caption: str = Form(""),
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    ext = os.path.splitext(image.filename)[1] or ".jpg"
    filename = f"{uuid.uuid4()}{ext}"
    filepath = os.path.join(UPLOAD_DIR, filename)
    with open(filepath, "wb") as f:
        shutil.copyfileobj(image.file, f)

    post = Post(
        image_url=f"/uploads/{filename}",
        caption=caption,
        user_id=current_user.id
    )
    db.add(post)
    db.commit()
    db.refresh(post)
    return _post_to_out(post, db, current_user.id)


@app.get("/api/posts", response_model=List[PostOut])
def get_feed(db: Session = Depends(get_db),
             current_user: User = Depends(get_current_user)):
    followed_ids = [
        f.followed_id for f in db.query(Follow).filter(
            Follow.follower_id == current_user.id
        ).all()
    ]
    followed_ids.append(current_user.id)

    posts = db.query(Post).filter(Post.user_id.in_(followed_ids)).order_by(
        desc(Post.created_at)
    ).all()
    return [_post_to_out(p, db, current_user.id) for p in posts]


@app.get("/api/feed", response_model=List[PostOut])
def get_global_feed(db: Session = Depends(get_db),
                    current_user: User = Depends(get_current_user)):
    posts = db.query(Post).order_by(desc(Post.created_at)).all()
    return [_post_to_out(p, db, current_user.id) for p in posts]


@app.get("/api/users/{user_id}/posts", response_model=List[PostOut])
def get_user_posts(user_id: int, db: Session = Depends(get_db),
                   current_user: User = Depends(get_current_user)):
    posts = db.query(Post).filter(Post.user_id == user_id).order_by(
        desc(Post.created_at)
    ).all()
    return [_post_to_out(p, db, current_user.id) for p in posts]


@app.delete("/api/posts/{post_id}")
def delete_post(post_id: int, db: Session = Depends(get_db),
                current_user: User = Depends(get_current_user)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if post.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not your post")

    if post.image_url and os.path.exists(os.path.join(BASE_DIR, post.image_url.lstrip("/"))):
        os.remove(os.path.join(BASE_DIR, post.image_url.lstrip("/")))

    db.delete(post)
    db.commit()
    return {"message": "Post deleted"}


# ─── Likes ──────────────────────────────────────────────────────

@app.post("/api/posts/{post_id}/like")
def like_post(post_id: int, db: Session = Depends(get_db),
              current_user: User = Depends(get_current_user)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    existing = db.query(Like).filter(
        Like.user_id == current_user.id,
        Like.post_id == post_id
    ).first()
    if not existing:
        db.add(Like(user_id=current_user.id, post_id=post_id))
        db.commit()
    return {"message": "Liked"}


@app.delete("/api/posts/{post_id}/like")
def unlike_post(post_id: int, db: Session = Depends(get_db),
                current_user: User = Depends(get_current_user)):
    existing = db.query(Like).filter(
        Like.user_id == current_user.id,
        Like.post_id == post_id
    ).first()
    if existing:
        db.delete(existing)
        db.commit()
    return {"message": "Unliked"}


# ─── Comments ───────────────────────────────────────────────────

@app.get("/api/posts/{post_id}/comments", response_model=List[CommentOut])
def get_comments(post_id: int, db: Session = Depends(get_db)):
    comments = db.query(Comment).filter(Comment.post_id == post_id).order_by(
        Comment.created_at
    ).all()
    return [_comment_to_out(c) for c in comments]


@app.post("/api/posts/{post_id}/comments", response_model=CommentOut)
def create_comment(post_id: int, data: CommentCreate,
                   db: Session = Depends(get_db),
                   current_user: User = Depends(get_current_user)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    comment = Comment(text=data.text, user_id=current_user.id, post_id=post_id)
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return _comment_to_out(comment)


@app.delete("/api/comments/{comment_id}")
def delete_comment(comment_id: int, db: Session = Depends(get_db),
                   current_user: User = Depends(get_current_user)):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    if comment.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not your comment")
    db.delete(comment)
    db.commit()
    return {"message": "Comment deleted"}


# ─── Messages ──────────────────────────────────────────────────

@app.post("/api/messages", response_model=MessageOut)
def send_message(data: MessageSend, db: Session = Depends(get_db),
                 current_user: User = Depends(get_current_user)):
    if data.receiver_id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot message yourself")
    receiver = db.query(User).filter(User.id == data.receiver_id).first()
    if not receiver:
        raise HTTPException(status_code=404, detail="User not found")
    msg = Message(sender_id=current_user.id, receiver_id=data.receiver_id, text=data.text)
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return MessageOut(
        id=msg.id, sender_id=msg.sender_id, receiver_id=msg.receiver_id,
        text=msg.text, created_at=msg.created_at, is_read=msg.is_read,
        sender_username=current_user.username, sender_avatar=current_user.avatar or ""
    )


@app.get("/api/conversations", response_model=List[ConversationOut])
def get_conversations(db: Session = Depends(get_db),
                      current_user: User = Depends(get_current_user)):
    sub = db.query(
        Message,
        db.query(Message.id).filter(
            or_(Message.sender_id == current_user.id, Message.receiver_id == current_user.id)
        ).order_by(desc(Message.created_at)).limit(1).correlate(Message).scalar_subquery()
    )
    # Get latest message for each conversation partner
    partner_ids = set()
    for m in db.query(Message).filter(
        or_(Message.sender_id == current_user.id, Message.receiver_id == current_user.id)
    ).all():
        partner_ids.add(m.sender_id if m.receiver_id == current_user.id else m.receiver_id)

    result = []
    for pid in partner_ids:
        last_msg = db.query(Message).filter(
            or_(
                and_(Message.sender_id == current_user.id, Message.receiver_id == pid),
                and_(Message.sender_id == pid, Message.receiver_id == current_user.id)
            )
        ).order_by(desc(Message.created_at)).first()
        if not last_msg:
            continue
        partner = db.query(User).filter(User.id == pid).first()
        if not partner:
            continue
        unread = db.query(Message).filter(
            Message.sender_id == pid, Message.receiver_id == current_user.id,
            Message.is_read == False
        ).count()
        result.append(ConversationOut(
            user_id=pid, username=partner.username, avatar=partner.avatar or "",
            last_message=last_msg.text, last_message_at=last_msg.created_at,
            unread_count=unread
        ))
    result.sort(key=lambda c: c.last_message_at, reverse=True)
    return result


@app.get("/api/messages/{user_id}", response_model=List[MessageOut])
def get_messages(user_id: int, db: Session = Depends(get_db),
                 current_user: User = Depends(get_current_user)):
    msgs = db.query(Message).filter(
        or_(
            and_(Message.sender_id == current_user.id, Message.receiver_id == user_id),
            and_(Message.sender_id == user_id, Message.receiver_id == current_user.id)
        )
    ).order_by(Message.created_at).all()

    # Mark received messages as read
    for m in msgs:
        if m.receiver_id == current_user.id and not m.is_read:
            m.is_read = True
    db.commit()

    result = []
    for m in msgs:
        sender = m.sender
        result.append(MessageOut(
            id=m.id, sender_id=m.sender_id, receiver_id=m.receiver_id,
            text=m.text, created_at=m.created_at, is_read=m.is_read,
            sender_username=sender.username, sender_avatar=sender.avatar or ""
        ))
    return result


# ─── Helpers ────────────────────────────────────────────────────

def _user_to_out(user: User, current_user_id: int) -> UserOut:
    followers_count = len(user.followers_rel or [])
    following_count = len(user.following_rel or [])
    posts_count = len(user.posts or [])
    is_followed = any(f.follower_id == current_user_id for f in (user.followers_rel or []))
    return UserOut(
        id=user.id, username=user.username, email=user.email,
        bio=user.bio or "", avatar=user.avatar or "",
        created_at=user.created_at,
        followers_count=followers_count,
        following_count=following_count,
        posts_count=posts_count,
        is_followed=is_followed
    )


def _post_to_out(post: Post, db: Session, current_user_id: int) -> PostOut:
    likes_count = len(post.likes) if post.likes else 0
    comments_count = len(post.comments) if post.comments else 0
    is_liked = any(l.user_id == current_user_id for l in (post.likes or []))
    return PostOut(
        id=post.id, image_url=post.image_url, caption=post.caption or "",
        created_at=post.created_at, user_id=post.user_id,
        username=post.author.username, avatar=post.author.avatar or "",
        likes_count=likes_count, comments_count=comments_count, is_liked=is_liked
    )


def _comment_to_out(comment: Comment) -> CommentOut:
    return CommentOut(
        id=comment.id, text=comment.text, created_at=comment.created_at,
        user_id=comment.user_id, username=comment.author.username,
        avatar=comment.author.avatar or "", post_id=comment.post_id
    )


@app.api_route("/{path:path}", methods=["GET"])
def spa_fallback(path: str):
    if path.startswith("api/") or path.startswith("uploads/") or path.startswith("frontend/"):
        raise HTTPException(status_code=404)
    return FileResponse(os.path.join(FRONTEND_DIR, "index.html"))
