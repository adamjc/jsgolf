# Set the base image to Ubuntu
FROM nginx:1.17

COPY nginx.conf /etc/nginx/nginx.conf

# Append "daemon off;" to the configuration file to keep NGINX in the foreground (for debugging)
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

RUN apt-get update
RUN apt-get install certbot python-certbot-nginx -y
RUN certbot -n --nginx --domains jsgolf.xyz,www.jsgolf.xyz

CMD service nginx start

