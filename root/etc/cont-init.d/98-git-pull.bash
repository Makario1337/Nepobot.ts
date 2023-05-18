#!/usr/bin/with-contenv bash

echo "Pulling GitHub Repo"
git clone https://github.com/Makario1337/Nepobot.ts.git /tmp 
mv /tmp/* /app
npm install --prefix /app
echo "Finished pulling..."
exit
