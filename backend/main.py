from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Query
import random
import string

app = FastAPI()

#Backend by default runs on: http://127.0.0.1:8000

# Add this:
origins = [
    "http://localhost:3000",  # React frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#adding a dummy comment to test
@app.get("/generate-password")
def generate_password(
    password_type: str = Query("a", regex="^(n|l|a)$"),  # n=number, l=letter, a=all
    digits: int = Query(12, ge=4, le=128)
):
    letters = string.ascii_lowercase
    numbers = "1234567890"
    special = "!@#$%&"

    if password_type == "n":
        password = ''.join(random.choice(numbers) for _ in range(digits))
    elif password_type == "l":
        password = ''.join(random.choice(letters) for _ in range(digits))
    else:
        password = ''
        for _ in range(digits - 3):
            choice = random.choice([letters, numbers, special])
            password += random.choice(choice)
        password += random.choice(letters)
        password += random.choice(numbers)
        password += random.choice(special)

    return {"password": password}