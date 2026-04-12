import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = os.environ.get("SUPABASE_URL", "https://placeholder.supabase.co")
key: str = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "placeholder_key")

# Using the service role key for backend operations so we can bypass RLS when necessary (e.g. creating user profiles),
# but normally we will use the user's JWT for client-dependent queries.
supabase_db: Client = create_client(url, key)

def get_db():
    return supabase_db
