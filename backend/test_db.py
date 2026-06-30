import psycopg2
from psycopg2.extras import RealDictCursor

# Unga URL-ah inga pottu check pannunga
URL = "postgresql://postgres:.2589630147894@db.https://piuhurxlsbegvozbciix.supabase.co:5432/postgres"

try:
    print("Connecting to Supabase...")
    conn = psycopg2.connect(URL, cursor_factory=RealDictCursor)
    print("✅ Success! Database connected perfectly bro!")
    conn.close()
except Exception as e:
    print(f"❌ Connection Failed: {e}")