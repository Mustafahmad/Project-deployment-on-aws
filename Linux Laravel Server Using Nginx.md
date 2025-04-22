<h1>LEMP Stack Installation Guide</h1>

<h2 align="center">1. Nginx Installation on VPS </h2>

```bash
sudo yum update -y
sudo amazon-linux-extras install nginx1 -y
```
  

```bash
 sudo nano /etc/nginx/conf.d/mysite.conf    #mysite is the name of project
  
  server {
    listen 80;
    server_name mysite.com www.mysite.com;

    root /var/www/mysite;
    index index.html index.htm index.php;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock; # Update PHP version if needed
    }

    location ~ /\.ht {
        deny all;
    }
}
```
```bash
    sudo nginx -t
    sudo systemctl restart nginx
```
Download node on linux

# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# download and install Node.js (you may need to restart the terminal)
nvm install 20

# verifies the right Node.js version is in the environment
node -v # should print `v20.16.0`

# verifies the right npm version is in the environment
npm -v # should print `10.8.1`



Start nginx commands:

sudo systemctl start nginx
sudo systemctl enable nginx

Make Directory
sudo mkdir -p /var/www/mysite
sudo chown -R $USER:$USER /var/www/mysite
sudo chmod -R 755 /var/www/mysite