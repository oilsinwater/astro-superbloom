# Superbloom Website

This is the Superbloom website built with Astro, Strapi CMS, and Docker.

## Project Structure

- `superbloom-cms/`: Strapi CMS backend
- `new-superbloom/`: Astro frontend

## Prerequisites

- Node.js v18+
- Docker
- Docker Compose

## Local Development Setup

1. **Start Strapi CMS**:
   ```bash
   cd superbloom-cms
   npm install
   npm run develop
   ```

2. **Start Astro Frontend**:
   ```bash
   cd new-superbloom
   npm install
   npm run dev
   ```

3. **Docker Setup**:
   ```bash
   docker-compose up -d
   ```

## Environment Variables

Create `.env` files in both `superbloom-cms` and `new-superbloom` directories with the following variables:

```env
# superbloom-cms/.env
DATABASE_CLIENT=postgres
DATABASE_HOST=db
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi

# new-superbloom/.env
STRAPI_URL=http://localhost:1337
```

## Docker Services

- **Strapi CMS**: http://localhost:1337
- **PostgreSQL**: port 5432
- **Frontend**: http://localhost:3000

## Content Types

The Strapi CMS includes the following content types:
- Blog Posts
- Projects
- Resources
- People
- Tags
- Topics
- Collections

## Deployment

For production deployment, update the environment variables with your production credentials and run:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Contributing

Please follow our [contribution guidelines](CONTRIBUTING.md) when making changes to the project.
