from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from database import get_db
import requests
import os

security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Validates the Supabase JWT by calling Supabase's own auth endpoint.
    This avoids needing the JWT secret locally - Supabase verifies for us.
    """
    token = credentials.credentials
    supabase_url = os.environ.get("SUPABASE_URL", "")
    supabase_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")
    
    try:
        # Use Supabase Auth API to verify the token and get user info
        resp = requests.get(
            f"{supabase_url}/auth/v1/user",
            headers={
                "Authorization": f"Bearer {token}",
                "apikey": supabase_key
            },
            timeout=10
        )
        
        if resp.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Invalid or expired token (status {resp.status_code})"
            )
        
        user_data = resp.json()
        user_id = user_data.get("id")
        
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not extract user ID from token"
            )
        
        return user_id
        
    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Could not reach auth service: {str(e)}"
        )
