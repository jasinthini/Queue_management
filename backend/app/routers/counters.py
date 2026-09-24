from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth.dependencies import require_role
from app.database.connection import get_db
from app.models.counter import Counter
from app.models.user import User
from app.schemas.counter import (
    CounterCreate,
    CounterResponse,
    CounterUpdate
)


router = APIRouter(
    prefix="/counters",
    tags=["Counters"]
)


# Create Counter
@router.post(
    "/",
    response_model=CounterResponse
)
def create_counter(
    counter_data: CounterCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("Admin", "Staff")
    )
):
    counter = Counter(
        name=counter_data.name,
        branch_id=counter_data.branch_id,
        service_id=counter_data.service_id
    )

    db.add(counter)
    db.commit()
    db.refresh(counter)

    return counter


# Get All Counters
@router.get(
    "/",
    response_model=list[CounterResponse]
)
def get_counters(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("Admin", "Staff", "Customer")
    )
):
    statement = select(Counter)

    counters = db.scalars(statement).all()

    return counters


# Get One Counter
@router.get(
    "/{counter_id}",
    response_model=CounterResponse
)
def get_counter(
    counter_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("Admin", "Staff", "Customer")
    )
):
    counter = db.get(Counter, counter_id)

    if counter is None:
        raise HTTPException(
            status_code=404,
            detail="Counter not found"
        )

    return counter


# Update Counter
@router.put(
    "/{counter_id}",
    response_model=CounterResponse
)
def update_counter(
    counter_id: int,
    counter_data: CounterUpdate,
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

    counter.name = counter_data.name
    counter.branch_id = counter_data.branch_id
    counter.service_id = counter_data.service_id
    counter.is_active = counter_data.is_active

    db.commit()
    db.refresh(counter)

    return counter


# Delete Counter
@router.delete(
    "/{counter_id}"
)
def delete_counter(
    counter_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("Admin")
    )
):
    counter = db.get(Counter, counter_id)

    if counter is None:
        raise HTTPException(
            status_code=404,
            detail="Counter not found"
        )

    db.delete(counter)
    db.commit()

    return {
        "message": "Counter deleted successfully"
    }