from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth.dependencies import require_role
from app.database.connection import get_db
from app.models.service import Service
from app.models.user import User
from app.schemas.service import (
    ServiceCreate,
    ServiceResponse,
    ServiceUpdate
)


router = APIRouter(
    prefix="/services",
    tags=["Services"]
)


@router.post(
    "/",
    response_model=ServiceResponse
)
def create_service(
    service_data: ServiceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("Admin", "Staff")
    )
):
    service = Service(
        name=service_data.name,
        description=service_data.description,
        branch_id=service_data.branch_id
    )

    db.add(service)
    db.commit()
    db.refresh(service)

    return service


@router.get(
    "/",
    response_model=list[ServiceResponse]
)
def get_services(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("Admin", "Staff", "Customer")
    )
):
    statement = select(Service)

    services = db.scalars(statement).all()

    return services


@router.get(
    "/{service_id}",
    response_model=ServiceResponse
)
def get_service(
    service_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("Admin", "Staff", "Customer")
    )
):
    service = db.get(Service, service_id)

    if service is None:
        raise HTTPException(
            status_code=404,
            detail="Service not found"
        )

    return service


@router.put(
    "/{service_id}",
    response_model=ServiceResponse
)
def update_service(
    service_id: int,
    service_data: ServiceUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("Admin", "Staff")
    )
):
    service = db.get(Service, service_id)

    if service is None:
        raise HTTPException(
            status_code=404,
            detail="Service not found"
        )

    service.name = service_data.name
    service.description = service_data.description
    service.branch_id = service_data.branch_id
    service.is_active = service_data.is_active

    db.commit()
    db.refresh(service)

    return service


@router.delete(
    "/{service_id}"
)
def delete_service(
    service_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("Admin")
    )
):
    service = db.get(Service, service_id)

    if service is None:
        raise HTTPException(
            status_code=404,
            detail="Service not found"
        )

    db.delete(service)
    db.commit()

    return {
        "message": "Service deleted successfully"
    }