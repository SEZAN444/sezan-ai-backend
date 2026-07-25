from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import uvicorn

from api.chat import router as chat_router

# Create FastAPI app
app = FastAPI(title="Sezan AI Assistant")

# Register API routes
app.include_router(chat_router, prefix="/api")

# Serve static folders
app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/widget", StaticFiles(directory="widget"), name="widget")


@app.get("/")
async def home():
    return FileResponse("index.html")


@app.get("/health")
async def health():
    return {"status": "online"}


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )