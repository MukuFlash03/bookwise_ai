# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY ./knowledge_graph /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    software-properties-common \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir \
    PyPDF2==3.0.1 \
    pydantic \
    openai==1.42.0 \
    fastapi==0.115.0 \
    uvicorn \
    python-dotenv==1.0.1 \
    supabase \
    anthropic \
    fireworks-ai \
    e2b_code_interpreter \
    pandas>=2.1.3 \
    numpy>=1.26.2 \
    networkx>=3.2.1 \
    seaborn>=0.13.0 \
    jupyterlab>=4.0.8 \
    langchain>=0.0.335 \
    pypdf>=3.17.0 \
    pyvis>=0.3.1 \
    tqdm>=4.38 \
    yachalk>=0.1.5 \
    unstructured>=0.10.30 \
    e2b

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Run app.py when the container launches
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
