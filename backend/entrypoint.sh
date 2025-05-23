#!/bin/sh

# Muestra el entorno para debug
echo "Running in environment: $NODE_ENV"

# Ejecuta según el entorno
if [ "$NODE_ENV" = "production" ]; then
  npm run start
else
  npm run dev
fi
