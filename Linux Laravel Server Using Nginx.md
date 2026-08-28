# Laravel on Amazon Linux — Nginx

Nginx setup for Laravel on **Amazon Linux** (uses `yum`, not `apt`).

---

## 1. Install Nginx

```bash
sudo yum update -y
sudo amazon-linux-extras install nginx1 -y
```

Start and enable Nginx:

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## 2. Create Project Directory

```bash
sudo mkdir -p /var/www/mysite
sudo chown -R $USER:$USER /var/www/mysite
sudo chmod -R 755 /var/www/mysite
```

---

## 3. Nginx Site Configuration

```bash
sudo nano /etc/nginx/conf.d/mysite.conf
```

Replace `mysite` with your project name:

```nginx
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
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

Test and restart:

```bash
sudo nginx -t
sudo systemctl restart nginx
```

> For Laravel, set `root` to `/var/www/mysite/public` and use `try_files $uri $uri/ /index.php?$query_string;` in the `/` location block.

---

## 4. Install Node.js (NVM)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Restart your terminal, then:

```bash
nvm install 20
node -v   # e.g. v20.16.0
npm -v    # e.g. 10.8.1
```
