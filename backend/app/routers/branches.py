from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth.dependencies import require_role
from app.database.connection import get_db
from app.models.branch import Branch
from app.models.user import User
from app.schemas.branch import (
    BranchCreate,
    BranchResponse,
    BranchUpdate
)


router = APIRouter(
    prefix="/branches",
    tags=["Branches"]
)


@router.post(
    "/",
    response_model=BranchResponse
)
def create_branch(
    branch_data: BranchCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("Admin")
    )
):
    branch = Branch(
        name=branch_data.name,
        address=branch_data.address,
        phone=branch_data.phone
    )

    db.add(branch)
    db.commit()
    db.refresh(branch)

    return branch


@router.get(
    "/",
    response_model=list[BranchResponse]
)
def get_branches(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("Admin", "Staff", "Customer")
    )
):
    statement = select(Branch)

    branches = db.scalars(statement).all()

    return branches


@router.get(
    "/{branch_id}",
    response_model=BranchResponse
)
def get_branch(
    branch_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("Admin", "Staff", "Customer")
    )
):
    branch = db.get(Branch, branch_id)

    if branch is None:
        raise HTTPException(
            status_code=404,
            detail="Branch not found"
        )

    return branch


@router.put(
    "/{branch_id}",
    response_model=BranchResponse
)
def update_branch(
    branch_id: int,
    branch_data: BranchUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("Admin")
    )
):
    branch = db.get(Branch, branch_id)

    if branch is None:
        raise HTTPException(
            status_code=404,
            detail="Branch not found"
        )

    branch.name = branch_data.name
    branch.address = branch_data.address
    branch.phone = branch_data.phone
    branch.is_active = branch_data.is_active

    db.commit()
    db.refresh(branch)

    return branch


@router.delete(
    "/{branch_id}"
)
def delete_branch(
    branch_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_role("Admin")
    )
):
    branch = db.get(Branch, branch_id)

    if branch is None:
        raise HTTPException(
            status_code=404,
            detail="Branch not found"
        )

    db.delete(branch)
    db.commit()

    return {
        "message": "Branch deleted successfully"
    }