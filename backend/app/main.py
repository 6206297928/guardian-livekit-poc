from fastapi import FastAPI, Query
from app.token_service import generate_token
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow the frontend to talk to the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/get-token")
async def get_token(
    room: str = Query(..., description="The name of the room to join"),
    user: str = Query(..., description="The name of the participant")
):
    token = generate_token(room, user)
    return {"token": token}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
