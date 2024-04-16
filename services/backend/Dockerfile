# syntax=docker/dockerfile:1


#==============================================================================#
#================================= Base Image =================================#
#==============================================================================#
ARG PYTHON_VERSION=3.12.2
FROM python:${PYTHON_VERSION}-alpine as base

# Set default shell options for the entire Dockerfile for better error handling
SHELL ["/bin/sh", "-eux", "-o", "pipefail", "-c"]

# Set environment variables for Python, pip, and Poetry.
ENV PYTHONUNBUFFERED=1 \
    # Pip Settings
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    # Poetry Settings
    POETRY_VERSION=1.8.2 \
    POETRY_HOME="/opt/poetry" \
    POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_CREATE=false \
    # Virtual Environment Path
    VIRTUAL_ENV="/venv" \
    # Add src to PYTHONPATH
    PYTHONPATH="$PYTHONPATH:/src"                   

# Prepend Poetry and venv to path.
ENV PATH="$POETRY_HOME/bin:$VIRTUAL_ENV/bin:$PATH"

# Install curl.
RUN apk update && \
    apk add --no-cache curl && \
    rm -rf /var/cache/apk/*

# Install Poetry.
RUN --mount=type=cache,target=/root/.cache \
    curl -sSL https://install.python-poetry.org | python3 -

# Prepare virtual environment.
RUN python -m venv $VIRTUAL_ENV


#==============================================================================#
#============================== Dependency Image ==============================#
#==============================================================================#
FROM base AS deps

# Used to initialize dependencies.
COPY pyproject.toml ./

# Install runtime dependencies to VIRTUAL_ENV.
RUN --mount=type=cache,target=/root/.cache \
    poetry install --only main


#==============================================================================#
#============================== Development Image =============================#
#==============================================================================#
FROM base as dev 

# Specify environment.
ENV ENVIRONMENT="development"

# Install git.
RUN apk update && \
    apk add --no-cache git make && \
    rm -rf /var/cache/apk/*

# Used to initialize dependencies.
COPY pyproject.toml ./

# Install missing dependencies to VIRTUAL_ENV.
RUN --mount=type=cache,target=/root/.cache \
    poetry install

EXPOSE 8000


#==============================================================================#
#============================== Production Image ==============================#
#==============================================================================#
FROM base as prod

# Specify environment.
ENV ENVIRONMENT="production"

# Set working directory
WORKDIR /workspace

# Copy dependencies from the deps stage.
COPY --from=deps $VIRTUAL_ENV $VIRTUAL_ENV

# Copy project files.
COPY . .

# Create a non-root user and set permissions.
RUN adduser -D appuser && \
    chown -R appuser:appuser /workspace

# Change to the non-root user.
USER appuser

# Command to run on startup.
CMD ["python", "src/main.py"]

