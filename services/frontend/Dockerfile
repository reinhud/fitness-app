# syntax=docker/dockerfile:1


#==============================================================================#
#================================= Base Image =================================#
#==============================================================================#
ARG NODE_VERSION=21.7.1
FROM node:${NODE_VERSION}-alpine AS base

# Set default shell options for the entire Dockerfile for better error handling
SHELL ["/bin/sh", "-eux", "-o", "pipefail", "-c"]

# Setting up the environment for pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enabling Corepack to manage package managers like pnpm
RUN corepack enable

RUN echo "Base image build successfully"

#==============================================================================#
#============================== Dependency Image ==============================#
#==============================================================================#
FROM base AS prod-deps

# Copying package.json and pnpm-lock.yaml for dependency installation
COPY package.json ./

# Installing production dependencies without updating the lockfile
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod

RUN echo "Dependency image build successfully"

#==============================================================================#
#============================== Development Image =============================#
#==============================================================================#
FROM base AS dev

# Specify environment
ENV NODE_ENV=development

# Install git.
RUN apk update && \
    apk add --no-cache git && \
    rm -rf /var/cache/apk/*

# Copying installed node_modules for production dependencies
COPY --from=prod-deps ./node_modules ./node_modules

# Copying package.json and pnpm-lock.yaml for dependency installation
COPY package.json ./

# Install all dependencies (will reuse production dependencies)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

RUN echo "Development image build successfully"