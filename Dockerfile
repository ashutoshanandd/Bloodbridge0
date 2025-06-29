# Base image
FROM node:18

# Install nginx and supervisor
RUN apt-get update && apt-get install -y nginx supervisor

# Create app directory
WORKDIR /app

# Copy backend
COPY backend /app/backend

# Install backend dependencies
RUN cd /app/backend && npm install

# Copy frontend
COPY client /app/client

# Install frontend dependencies and build
RUN cd /app/client && npm install && npm run build

# Move built frontend to nginx directory
RUN cp -r /app/client/build/* /var/www/html/

# Copy custom nginx config (optional)
# COPY nginx.conf /etc/nginx/sites-enabled/default

# Copy supervisor config
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose both ports
EXPOSE 80
EXPOSE 8001

# Start both services
CMD ["/usr/bin/supervisord", "-n"]
