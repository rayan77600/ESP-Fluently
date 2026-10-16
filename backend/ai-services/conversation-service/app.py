from fastapi import FastAPI

app = FastAPI(title="Conversation Service", version="1.0")

@app.get("/")
def root():
    return {"service": "conversation", "status": "running"}

@app.get("/health")
def health():
    return {"status": "ok", "service": "conversation"}