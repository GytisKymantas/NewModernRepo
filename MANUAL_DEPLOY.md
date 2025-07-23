# Manual Deployment Guide

This guide is for deploying manually until GitLab CI/CD variables are configured by admins.

**📁 Using home directory: `~/self-service-jar-provider-ui`**

## 🚀 Quick Deploy Process

### 1. **Get Image Tag from GitLab CI**

After running the `build-and-push-image` job, check the logs for the **BUILD SUMMARY** section:

```
🎉 BUILD SUMMARY
═══════════════════════════════════════════════════════
📋 Build Information:
  - Branch: staging
  - Commit: abc123
  - Pipeline: 12345
🐳 Docker Image:
  - Image: dockerrep.registrucentras.lt:5000/self-service-jar-provider-ui:latest_abc123
  - Registry: dockerrep.registrucentras.lt:5000
🚀 Manual Deployment:
  - Update .env with: DOCKER_TAG=latest_abc123
  - Run: docker-compose pull && docker-compose up -d
═══════════════════════════════════════════════════════
```

Copy the **DOCKER_TAG** value from the summary: `latest_abc123`

### 2. **Connect to Server**

```bash
ssh devadmin@YOUR_SERVER_IP
```

### 3. **Create Deployment Directory**

```bash
mkdir -p ~/self-service-jar-provider-ui
cd ~/self-service-jar-provider-ui
```

### 4. **Create Environment File**

```bash
cat > .env << EOF
NODE_ENV=production
DOCKER_IMAGE_NAME=dockerrep.registrucentras.lt:5000/self-service-jar-provider-ui
DOCKER_TAG=lates
APP_PORT=8080
EOF
```

**⚠️ Replace `latest_abc123` with the actual tag from GitLab CI BUILD SUMMARY**

### 5. **Create Docker Compose File**

```bash
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  app:
    image: ${DOCKER_IMAGE_NAME:-dockerrep.registrucentras.lt:5000/self-service-jar-provider-ui}:${DOCKER_TAG:-latest}
    container_name: self-service-ui
    ports:
      - '${APP_PORT:-8080}:82'
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    networks:
      - app-network
    healthcheck:
      test: ['CMD', 'wget', '--quiet', '--tries=1', '--spider', 'http://localhost:82']
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    logging:
      driver: 'json-file'
      options:
        max-size: '10m'
        max-file: '3'

networks:
  app-network:
    driver: bridge
EOF
```

### 6. **Deploy Commands**

```bash
# Pull the latest image
docker-compose pull

# Start the application
docker-compose up -d

# Check if it's running
docker-compose ps
docker-compose logs -f
```

## 🔄 **Update Deployment**

When you have a new image from CI:

1. **Copy commands from BUILD SUMMARY** and run them:

   ```bash
   # From the BUILD SUMMARY, copy and run these commands:

   # Update .env with new tag (example)
   echo "DOCKER_TAG=latest_xyz789" >> .env

   # Deploy (exactly as shown in BUILD SUMMARY)
   docker-compose pull && docker-compose up -d
   ```

2. **Alternative - Manual edit**:

   ```bash
   # Edit the file manually
   nano .env

   # Change DOCKER_TAG to new version from BUILD SUMMARY
   DOCKER_TAG=latest_xyz789

   # Deploy
   docker-compose pull
   docker-compose up -d --force-recreate
   ```

## 🔍 **Useful Commands**

```bash
# Check running containers
docker ps

# View logs
docker-compose logs -f

# Stop application
docker-compose down

# Check images
docker images | grep self-service

# Remove old images (cleanup)
docker image prune -f
```

## 📋 **Server Requirements**

Make sure your server has:

```bash
# Install Docker and Docker Compose
sudo dnf install -y docker docker-compose

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add devadmin to docker group
sudo usermod -aG docker devadmin

# Test access
docker --version
docker-compose --version
```

## 🎯 **Complete Example**

Here's a complete deployment script you can run:

```bash
#!/bin/bash

# Configuration
IMAGE_TAG="latest_abc123"  # Replace with actual tag from CI
SERVER_IP="YOUR_SERVER_IP"  # Replace with your server IP
DEPLOY_PATH="~/self-service-jar-provider-ui"

echo "🚀 Deploying self-service-jar-provider-ui"

# Connect to server and deploy
ssh devadmin@$SERVER_IP << EOF
  # Create directory
  mkdir -p $DEPLOY_PATH
  cd $DEPLOY_PATH

  # Create .env file
  cat > .env << 'ENVEOF'
NODE_ENV=production
DOCKER_IMAGE_NAME=dockerrep.registrucentras.lt:5000/self-service-jar-provider-ui
DOCKER_TAG=$IMAGE_TAG
APP_PORT=8080
ENVEOF

  # Create docker-compose.yml (if not exists)
  if [ ! -f docker-compose.yml ]; then
    # Copy from project or create manually
    echo "Please copy docker-compose.yml to this directory"
  fi

  # Deploy
  docker-compose pull
  docker-compose up -d --force-recreate

  echo "✅ Deployment complete!"
  docker-compose ps
EOF
```

## 🔧 **When GitLab Variables Are Ready**

Once admins configure the GitLab variables, simply:

1. Uncomment the `deploy-staging` job in `.gitlab-ci.yml`
2. Remove the `#` from all the deploy job lines
3. Push to staging branch and use automated deployment

The manual deployment will be replaced by automated CI/CD! 🎉
