# Deploy Laravel on Ubuntu (AWS) — LEMP Stack

Install Nginx, MySQL, PHP, and Composer on an Ubuntu VPS / AWS EC2 instance, then serve a Laravel project.

---

## 1. Install Nginx

```bash
sudo apt update
sudo apt upgrade
sudo apt install nginx
```

---

## 2. Install MySQL, PHP & Composer

### MySQL

```bash
sudo apt install mysql-server
```

### PHP & PHP-FPM

```bash
sudo apt install php-fpm php-mysql
```

For a specific PHP version (e.g. 8.1):

```bash
sudo apt install php8.1 php8.1-fpm php8.1-mysql
```

Check services:

```bash
sudo service php8.1-fpm status
sudo service nginx status
```

### Composer

```bash
sudo apt install composer
```

---

## 3. SSH Connection with GitHub

Set up deploy keys so you can clone private repos on the server.

### Method 1: ed25519 Key

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
cat ~/.ssh/id_ed25519.pub
```

### Method 2: RSA Key

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
cat ~/.ssh/id_rsa.pub
```

Add the public key on GitHub:

**GitHub → Repository → Settings → Deploy Keys → Add deploy key**

Test the connection:

```bash
ssh -T git@github.com
```

### Folder Permissions for Git Clone

```bash
sudo chown -R ubuntu:ubuntu /var/www/html
```

> Use your username instead of `ubuntu` if different.  
> Run `git clone` **without** `sudo`.

---

## 4. Nginx Site Configuration

```bash
cd /etc/nginx/sites-available/
sudo nano laravel_project
```

Add this configuration (adjust domain, paths, and PHP version):

```nginx
server {
    listen 80;
    server_name your_domain.com;
    root /var/www/html/laravel_project/public;
    index index.php index.html index.htm;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/laravel_project /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 5. Laravel Permissions

Make `storage/` and `bootstrap/cache/` writable:

```bash
sudo chmod 777 -R storage/
sudo chmod 777 -R bootstrap/
```

---

## Reference

- [GeekyShows LEMP Stack Installation](https://github.com/geekyshow1/GeekyShowsNotes/blob/main/LEMP_Stack_Installation.md)
