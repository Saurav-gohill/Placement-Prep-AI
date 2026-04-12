from fastapi import APIRouter, Depends

router = APIRouter()

@router.get('/ping')
def ping():
    return {'module': 'auth'}
