# GitLab CI/CD Deployment Guide

This document explains how to customize and use the GitLab CI/CD pipeline for the self-service JAR provider UI project.

## Pipeline Overview

The CI/CD pipeline consists of 5 stages:

1. **Build** - Install dependencies, lint, and build the application
2. **Test** - Run unit tests and generate coverage reports
3. **Security** - Run security audits on dependencies
4. **Package** - Build and push Docker images
5. **Deploy** - Deploy to staging/production environments

## Pipeline Triggers

- **Merge Requests**: Runs build, test, security, and docker-build-mr (without pushing)
- **Main Branch**: Full pipeline including deployment to production (manual)
- **Staging Branch**: Full pipeline including deployment to staging (manual)
- **Develop Branch**: Runs build, test, security, and pushes Docker images

## Docker Images

Images are built and pushed to GitLab Container Registry with the following tags:

- `$CI_COMMIT_SHA` - Unique tag for each commit
- `latest` - Latest image from main/staging/develop branches
- `cache` - Build cache layer for faster subsequent builds

## Customizing Deployment

### 1. Update Environment URLs

Edit the following in `.gitlab-ci.yml`:

```yaml
# Staging environment
environment:
  name: staging
  url: https://staging.your-domain.com  # Update this

# Production environment
environment:
  name: production
  url: https://your-domain.com  # Update this
```

### 2. Add Deployment Scripts

Replace the placeholder deployment scripts with your actual deployment commands:

#### For Kubernetes:

```yaml
script:
  - kubectl set image deployment/app-deployment app=$DOCKER_IMAGE_NAME:$DOCKER_TAG
  - kubectl rollout status deployment/app-deployment
```

#### For Docker Compose:

```yaml
script:
  - docker-compose pull
  - docker-compose up -d --force-recreate
```

#### For SSH Deployment:

```yaml
before_script:
  - 'which ssh-agent || ( apt-get update -y && apt-get install openssh-client -y )'
  - eval $(ssh-agent -s)
  - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
  - mkdir -p ~/.ssh && chmod 700 ~/.ssh
  - ssh-keyscan $SERVER_HOST >> ~/.ssh/known_hosts
script:
  - ssh $SSH_USER@$SERVER_HOST "docker pull $DOCKER_IMAGE_NAME:$DOCKER_TAG"
  - ssh $SSH_USER@$SERVER_HOST "docker stop app || true"
  - ssh $SSH_USER@$SERVER_HOST "docker run -d --name app -p 80:82 $DOCKER_IMAGE_NAME:$DOCKER_TAG"
```

### 3. Environment Variables

Set these variables in GitLab CI/CD settings:

#### Required (automatically provided by GitLab):

- `CI_REGISTRY_IMAGE` - Container registry image path
- `CI_REGISTRY_USER` - Registry username
- `CI_REGISTRY_PASSWORD` - Registry password

#### Optional (for custom deployments):

- `SSH_PRIVATE_KEY` - SSH private key for deployment
- `SERVER_HOST` - Deployment server hostname
- `SSH_USER` - SSH username
- `KUBECONFIG` - Kubernetes configuration (base64 encoded)

## Security Considerations

1. **Secrets Management**: Never hardcode secrets in the pipeline. Use GitLab CI/CD variables with protection enabled.

2. **Registry Access**: The pipeline uses GitLab's built-in container registry. Images are private by default.

3. **Branch Protection**: Deploy jobs are set to `when: manual` for production safety.

## Performance Optimizations

1. **Caching**: Node modules are cached based on `package-lock.json` checksum
2. **Docker Layer Caching**: Uses registry-based caching for faster Docker builds
3. **Parallel Jobs**: Test and security scans run in parallel where possible

## Troubleshooting

### Common Issues

1. **Docker Build Fails**: Check that the Dockerfile is valid and all required files are present
2. **Test Failures**: Ensure all tests pass locally before pushing
3. **Registry Push Fails**: Verify GitLab Container Registry is enabled for the project

### Debugging Tips

1. Enable debug output by adding `VERBOSE: "true"` to job variables
2. Use `docker run -it $IMAGE_NAME sh` to debug container issues
3. Check GitLab CI/CD variables are correctly set

## Manual Deployment

To manually deploy without CI/CD:

```bash
# Build the Docker image
docker build -t self-service-ui .

# Run locally for testing
docker run -p 8080:82 self-service-ui

# Tag for registry
docker tag self-service-ui registry.gitlab.com/your-group/your-project

# Push to registry
docker push registry.gitlab.com/your-group/your-project
```

## Next Steps

1. Update environment URLs in the pipeline
2. Configure your deployment method (Kubernetes, Docker Compose, SSH, etc.)
3. Set required environment variables in GitLab
4. Test the pipeline with a merge request
5. Enable branch protection for main/staging branches
