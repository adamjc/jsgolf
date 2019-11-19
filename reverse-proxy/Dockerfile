# Set the base image to Ubuntu
FROM nginx:1.17

COPY nginx.conf /etc/nginx/nginx.conf

# Append "daemon off;" to the configuration file to keep NGINX in the foreground (for debugging)
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Set the default command to execute when creating a new container
CMD service nginx start

