from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    user_message = request.message.strip().lower()

    if user_message in ["hi", "hello", "hey"]:
        return ChatResponse(reply="Hello! I'm Sezan's AI Assistant.")

    if "name" in user_message:
        return ChatResponse(reply="I'm Sezan's AI Assistant.")

    return ChatResponse(
        reply=f"You said: {request.message}\n\nAI integration is coming soon."
    )