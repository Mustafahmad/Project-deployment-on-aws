# Deploy React on Ubuntu

Build and serve a React app on Ubuntu using Node.js, PM2, and Nginx.

---

## 1. Install Nginx

```bash
sudo apt update
sudo apt upgrade
sudo apt install nginx
```

---

## 2. SSH Connection with GitHub

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

Add the key on GitHub:

**GitHub → Repository → Settings → Deploy Keys → Add deploy key**

Test connection:

```bash
ssh -T git@github.com
```

### Folder Permissions

```bash
sudo chown -R ubuntu /var/www
```

> Replace `ubuntu` with your username. Run `git clone` **without** `sudo`.

---

## 3. Install Node.js 20

```bash
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version && npm --version
```

---

## 4. Install PM2

```bash
sudo npm i pm2 -g
```

---

## 5. Nginx Configuration

```bash
cd /etc/nginx/sites-available/
sudo nano reactApp
```

```nginx
server {
    listen 80;
    server_name your_server_ip;

    location / {
        root /var/www/react-app-1/build;
        try_files $uri /index.html;
    }
}
```

Enable and restart:

```bash
sudo ln -s /etc/nginx/sites-available/reactApp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Build & Deploy

On the server (or locally, then upload the `build/` folder):

```bash
cd /var/www/react-app-1
npm install
npm run build
```

The Nginx config above serves files from `/var/www/react-app-1/build`.
