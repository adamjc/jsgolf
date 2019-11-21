yum install -y docker-ce
yum install -y docker-compose

cd /var/jsgolf-server
docker-compose up -d --build
