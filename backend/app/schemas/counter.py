from pydantic import BaseModel


class CounterCreate(BaseModel):
    name: str
    branch_id: int
    service_id: int


class CounterResponse(BaseModel):
    id: int
    name: str
    branch_id: int
    service_id: int
    is_active: bool

    class Config:
        from_attributes = True


class CounterUpdate(BaseModel):
    name: str
    branch_id: int
    service_id: int
    is_active: bool