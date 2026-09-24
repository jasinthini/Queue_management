from datetime import datetime

from pydantic import BaseModel


class QueueTicketCreate(BaseModel):
    branch_id: int
    service_id: int


class QueueTicketResponse(BaseModel):
    id: int
    token_number: str
    customer_id: int
    branch_id: int
    service_id: int
    counter_id: int | None
    status: str
    position: int
    created_at: datetime
    called_at: datetime | None
    completed_at: datetime | None

    class Config:
        from_attributes = True


class QueueTicketStatusUpdate(BaseModel):
    status: str