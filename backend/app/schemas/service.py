from pydantic import BaseModel


class ServiceCreate(BaseModel):
    name: str
    description: str | None = None
    branch_id: int


class ServiceResponse(BaseModel):
    id: int
    name: str
    description: str | None
    branch_id: int
    is_active: bool

    class Config:
        from_attributes = True


class ServiceUpdate(BaseModel):
    name: str
    description: str | None = None
    branch_id: int
    is_active: bool