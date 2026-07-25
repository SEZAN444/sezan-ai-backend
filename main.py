from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from api.chat import router as chat_router

# Create FastAPI app
app = FastAPI(title="Sezan AI Assistant")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://sezan-portfolio.netlify.app",
        "http://localhost:8000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API routes
app.include_router(chat_router, prefix="/api")

# Static folders
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
        host="localhost",
        port=8000,
        reload=True
    )