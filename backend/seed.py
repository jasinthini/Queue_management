from sqlalchemy import select

from app.database.connection import SessionLocal
from app.models.user import User
from app.auth.security import hash_password


def seed_users():

    db = SessionLocal()

    try:

        # Admin
        admin = db.scalars(
            select(User).where(
                User.username == "admin"
            )
        ).first()

        if not admin:
            admin = User(
                username="admin",
                email="admin@queueflow.com",
                password_hash=hash_password("Admin@12345"),
                role="Admin",
                is_active=True
            )

            db.add(admin)

        # Staff
        staff = db.scalars(
            select(User).where(
                User.username == "staff"
            )
        ).first()

        if not staff:
            staff = User(
                username="staff",
                email="staff@queueflow.com",
                password_hash=hash_password("Staff@12345"),
                role="Staff",
                is_active=True
            )

            db.add(staff)

        db.commit()

        print("Seed users created successfully!")

    except Exception as e:
        db.rollback()
        print("Seed failed!")
        print(e)

    finally:
        db.close()


if __name__ == "__main__":
    seed_users()