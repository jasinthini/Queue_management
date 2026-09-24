from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user, require_role
from app.database.connection import get_db
from app.models.counter import Counter
from app.models.queue_ticket import QueueTicket
from app.models.user import User
from app.schemas.queue_ticket import (
    QueueTicketCreate,
    QueueTicketResponse,
    QueueTicketStatusUpdate
)


router = APIRouter(
    prefix="/queue-tickets",
    tags=["Queue Tickets"]
)


# Customer creates a queue ticket
@router.post(
    "/",
    response_model=QueueTicketResponse
)
def create_queue_ticket(
    ticket_data: QueueTicketCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("Customer", "Admin", "Staff")
    )
):
    statement = select(
        func.count(QueueTicket.id)
    ).where(
        QueueTicket.service_id == ticket_data.service_id,
        QueueTicket.branch_id == ticket_data.branch_id,
        QueueTicket.status == "WAITING"
    )

    waiting_count = db.scalar(statement) or 0

    position = waiting_count + 1

    token_count_statement = select(
        func.count(QueueTicket.id)
    ).where(
        QueueTicket.branch_id == ticket_data.branch_id,
        QueueTicket.service_id == ticket_data.service_id
    )

    token_count = db.scalar(token_count_statement) or 0

    token_number = f"A{token_count + 1:03d}"

    ticket = QueueTicket(
        token_number=token_number,
        customer_id=current_user.id,
        branch_id=ticket_data.branch_id,
        service_id=ticket_data.service_id,
        counter_id=None,
        status="WAITING",
        position=position
    )

    db.add(ticket)
    db.commit()
    db.refresh(ticket)

    return ticket


# Get all queue tickets
@router.get(
    "/",
    response_model=list[QueueTicketResponse]
)
def get_queue_tickets(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("Admin", "Staff")
    )
):
    statement = select(QueueTicket).order_by(
        QueueTicket.created_at
    )

    tickets = db.scalars(statement).all()

    return tickets


# Get my queue tickets
@router.get(
    "/my",
    response_model=list[QueueTicketResponse]
)
def get_my_queue_tickets(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    statement = select(QueueTicket).where(
        QueueTicket.customer_id == current_user.id
    ).order_by(
        QueueTicket.created_at.desc()
    )

    tickets = db.scalars(statement).all()

    return tickets


# Call next waiting customer
@router.post(
    "/next/{counter_id}",
    response_model=QueueTicketResponse
)
def call_next_customer(
    counter_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("Admin", "Staff")
    )
):
    counter = db.get(Counter, counter_id)

    if counter is None:
        raise HTTPException(
            status_code=404,
            detail="Counter not found"
        )

    statement = (
        select(QueueTicket)
        .where(
            QueueTicket.branch_id == counter.branch_id,
            QueueTicket.service_id == counter.service_id,
            QueueTicket.status == "WAITING",
            QueueTicket.counter_id.is_(None)
        )
        .order_by(
            QueueTicket.created_at
        )
    )

    ticket = db.scalars(statement).first()

    if ticket is None:
        raise HTTPException(
            status_code=404,
            detail="No waiting customer"
        )

    ticket.counter_id = counter_id
    ticket.status = "CALLED"
    ticket.called_at = datetime.utcnow()

    db.commit()
    db.refresh(ticket)

    return ticket


# Get one queue ticket
@router.get(
    "/{ticket_id}",
    response_model=QueueTicketResponse
)
def get_queue_ticket(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    ticket = db.get(QueueTicket, ticket_id)

    if ticket is None:
        raise HTTPException(
            status_code=404,
            detail="Queue ticket not found"
        )

    return ticket


# Update queue ticket status
@router.put(
    "/{ticket_id}/status",
    response_model=QueueTicketResponse
)
def update_queue_ticket_status(
    ticket_id: int,
    status_data: QueueTicketStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("Admin", "Staff")
    )
):
    allowed_statuses = [
        "WAITING",
        "CALLED",
        "SERVING",
        "COMPLETED",
        "SKIPPED",
        "CANCELLED"
    ]

    if status_data.status not in allowed_statuses:
        raise HTTPException(
            status_code=400,
            detail="Invalid queue status"
        )

    ticket = db.get(QueueTicket, ticket_id)

    if ticket is None:
        raise HTTPException(
            status_code=404,
            detail="Queue ticket not found"
        )

    ticket.status = status_data.status

    if status_data.status == "CALLED":
        ticket.called_at = datetime.utcnow()

    if status_data.status == "COMPLETED":
        ticket.completed_at = datetime.utcnow()

    db.commit()
    db.refresh(ticket)

    return ticket