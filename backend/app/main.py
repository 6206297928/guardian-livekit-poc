import os
import shutil
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# Import the token logic - Adjusting to the common naming convention
try:
    from .token_service import generate_token as create_token
except ImportError:
    # If it's named differently in your file, try the other common name
    from .token_service import get_token as create_token

app = FastAPI()

# Enable CORS so your Vercel frontend can talk to your local backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Module 2: Storage logic
UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

# Mount the static directory so files are downloadable
app.mount("/download", StaticFiles(directory=UPLOAD_DIR), name="download")

@app.get("/get-token")
async def get_token(room: str, user: str):
    token = create_token(room, user)
    return {"token": token}

@app.post("/upload-secure-file")
async def upload_file(file: UploadFile = File(...)):
    # AI-Native Security Check: Blocking hazardous extensions
    forbidden = [".exe", ".sh", ".bat", ".bin"]
    if any(file.filename.lower().endswith(ext) for ext in forbidden):
        raise HTTPException(status_code=400, detail="Security Alert: File type blocked.")

    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "status": "verified",
        "url": f"http://localhost:8000/download/{file.filename}",
        "fileName": file.filename
    }
