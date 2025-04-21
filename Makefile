DOCKER_COMPOSE = docker-compose

# Create containers
create:
	@echo "Creando los contenedores..."
	$(DOCKER_COMPOSE) up --build -d
	$(DOCKER_COMPOSE) down
	@echo "Contenedores creados."

# Regenerate containers
build:
	@echo "Regenerando los contenedores..."
	$(DOCKER_COMPOSE) down --volumes --rmi all
	$(DOCKER_COMPOSE) up --build -d
	$(DOCKER_COMPOSE) down
	@echo "Contenedores regenerados."

# Stop all containers
stop:
	@echo "Deteniendo los contenedores..."
	$(DOCKER_COMPOSE) down
	@echo "Contenedores detenidos."

# Start containers
srv:
	@echo "Iniciando los contenedores..."
	$(DOCKER_COMPOSE) up
	$(DOCKER_COMPOSE) logs -f
	@echo "Contenedores en ejecución."
