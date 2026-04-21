import os
from livekit import api # This refers to the livekit-api package
from dotenv import load_dotenv

load_dotenv()

LIVEKIT_API_KEY = os.getenv("LIVEKIT_API_KEY", "devkey")
LIVEKIT_API_SECRET = os.getenv("LIVEKIT_API_SECRET", "secret")

def generate_token(room_name: str, participant_name: str):
    # In 2026 SDK, use the fully qualified path from the api module
    token = api.AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET) \
        .with_identity(participant_name) \
        .with_name(participant_name) \
        .with_grants(api.VideoGrants(
            room_join=True,
            room=room_name,
            can_publish=True,
            can_subscribe=True,
        ))

    return token.to_jwt()
