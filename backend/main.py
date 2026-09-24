from fastapi import FastAPI

from app.database.connection import Base, engine

# Models
from app.models.user import User
from app.models.branch import Branch
from app.models.service import Service
from app.models.counter import Counter
from app.models.queue_ticket import QueueTicket
# Routers
from app.routers.auth import router as auth_router
from app.routers.users import router as users_router
from app.routers.branches import router as branches_router
from app.routers.services import router as services_router
from app.routers.counters import router as counters_router
from app.routers.queue_tickets import router as queue_tickets_router
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="QueueFlow API"
)


app.include_router(auth_router)
app.include_router(users_router)
app.include_router(branches_router)
app.include_router(services_router)
app.include_router(counters_router)
app.include_router(queue_tickets_router)

@app.get("/")
def root():
    return {
        "message": "QueueFlow API is running"
    }