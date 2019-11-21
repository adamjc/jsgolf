rsync -r --delete-after --quiet . root@jsgolf.xyz:/var/jsgolf-server
ssh -t root@jsgolf.xyz 'sh' < start.sh
