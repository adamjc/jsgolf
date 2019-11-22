yum install -y docker-ce
yum install -y docker-compose

cd /var/jsgolf-server
docker-compose build --no-cache &&
docker-compose up -d &&
docker exec reverse_proxy certbot register --agree-tos --email adamjc86+jsgolf@gmail.com --no-eff-email
docker exec reverse_proxy certbot -n --nginx --domains jsgolf.xyz,www.jsgolf.xyz