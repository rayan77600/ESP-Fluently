from fastapi import FastAPI

app = FastAPI(title="Matchmaking Service", version="1.0")

@app.get("/")
def root():
    return {"service": "matchmaking", "status": "running"}

@app.get("/health")
def health():
    return {"status": "ok", "service": "matchmaking"}