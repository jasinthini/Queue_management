from sqlalchemy import select

from app.database.connection import SessionLocal
from app.models.user import User
from app.auth.security import hash_password


db = SessionLocal()

try:
    user = db.scalars(
        select(User).where(
            User.username == "kumar123"
        )
    ).first()

    if user is None:
        print("User not found!")
    else:
        user.password_hash = hash_password("Kumar@12345")

        db.commit()

        print("Password reset successfully!")

finally:
    db.close()