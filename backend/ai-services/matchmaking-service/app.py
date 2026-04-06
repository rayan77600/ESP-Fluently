from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"service": "matchmaking", "status": "running"}