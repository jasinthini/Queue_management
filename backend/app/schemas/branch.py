from pydantic import BaseModel


class BranchCreate(BaseModel):
    name: str
    address: str
    phone: str


class BranchResponse(BaseModel):
    id: int
    name: str
    address: str
    phone: str
    is_active: bool

    class Config:
        from_attributes = True


class BranchUpdate(BaseModel):
    name: str
    address: str
    phone: str
    is_active: bool