# ===== Backend (Docker/GHCR) =====
GH_OWNER ?= bonsol-collective
IMAGE_NAME ?= bonfire-dashboard
IMAGE_URI ?= ghcr.io/$(GH_OWNER)/$(IMAGE_NAME)
VERSION ?= $(shell git rev-parse --short HEAD 2>/dev/null || date +%s)

BACKEND_CONTEXT ?= src
DOCKERFILE ?= Dockerfile
DOCKER = podman

# ===== Frontend (S3) =====
CLIENT_DIR ?= client
NPM ?= npm
FRONTEND_BUILD_DIR ?= dist

S3_BUCKET ?= explorer.bonsol.org
AWS_PROFILE ?= bonsol
AWS_REGION ?= us-east-1

# ===== Helpers =====
define check-cmd
	$(if $(shell command -v $1 2>/dev/null),,$(error "$1 not found. Please install it."))
endef

.PHONY: help
help:
	@echo "Targets:"
	@echo "  build-backend     Build Docker image for the backend -> $(IMAGE_URI):$(VERSION),latest"
	@echo "  push-backend      Push tags to GHCR (requires GHCR_USERNAME and GHCR_TOKEN)"
	@echo "  deploy-backend    build-backend + push-backend"
	@echo "  build-frontend    npm ci && npm run build in $(CLIENT_DIR)"
	@echo "  deploy-frontend   Upload frontend build to s3://$${S3_BUCKET}/"
	@echo "  all               release-backend + deploy-frontend"
	@echo ""
	@echo "Examples:"
	@echo "  GHCR_USERNAME=myuser GHCR_TOKEN=*** make release-backend"

# ===== GHCR Login =====
.PHONY: login-ghcr
login-ghcr:
	$(call check-cmd,$(DOCKER))
	@if [ -z "$$GHCR_USERNAME" ] || [ -z "$$GHCR_TOKEN" ]; then \
		echo "Set GHCR_USERNAME and GHCR_TOKEN to push to GHCR."; exit 1; \
	fi
	@echo "$$GHCR_TOKEN" | $(DOCKER) login ghcr.io -u "$$GHCR_USERNAME" --password-stdin

# ===== Backend Build/Push =====
.PHONY: build-backend
build-backend:
	$(call check-cmd,$(DOCKER))
	@echo "Building $(IMAGE_URI):$(VERSION) (Dockerfile: $(DOCKERFILE))"
	$(DOCKER) build -f $(DOCKERFILE) -t $(IMAGE_URI):$(VERSION) -t $(IMAGE_URI):latest .

.PHONY: push-backend
push-backend: login-ghcr
	@echo "Pushing $(IMAGE_URI):$(VERSION) and :latest"
	$(DOCKER) push $(IMAGE_URI):$(VERSION)
	$(DOCKER) push $(IMAGE_URI):latest

.PHONY: deploy-backend
deploy-backend: build-backend push-backend

# ===== Frontend Build/Deploy =====
.PHONY: build-frontend
build-frontend:
	$(call check-cmd,$(NPM))
	@echo "Building frontend in $(CLIENT_DIR)"
	$(NPM) ci && $(NPM) run build:client
	@echo "Build directory detected: $(CLIENT_DIR)/$(FRONTEND_BUILD_DIR)"

.PHONY: deploy-frontend
deploy-frontend: build-frontend
	$(call check-cmd,aws)
	@echo "Uploading HTML with no-cache to s3://$(S3_BUCKET)/"
	aws s3 sync "$(CLIENT_DIR)/$(FRONTEND_BUILD_DIR)/" "s3://$(S3_BUCKET)/" --delete --profile $(AWS_PROFILE) 

# ===== Combined =====
.PHONY: all
all: release-backend deploy-frontend

# ===== Utility =====
.PHONY: clean-frontend
clean-frontend:
	@rm -rf "$(CLIENT_DIR)/dist" "$(CLIENT_DIR)/build" || true