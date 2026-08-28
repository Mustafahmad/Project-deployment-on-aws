# Deploy Node.js on Ubuntu

Run a Node.js app on Ubuntu with NVM, PM2, and Nginx as a reverse proxy.

---

## 1. Install Nginx

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install nginx -y
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

### Folder Permissions for Git Clone

```bash
sudo chown -R ubuntu:ubuntu /var/www/html
```

> Replace `ubuntu` with your username. Run `git clone` **without** `sudo`.

---

## 3. Install Node.js 20 (NVM)

Install curl if needed:

```bash
sudo apt install curl -y
```

Install NVM:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.bashrc
nvm --version
```

Install and use Node 20:

```bash
nvm install 20
nvm use 20
nvm alias default 20
node -v
npm -v
```

---

## 4. Install PM2

```bash
npm install -g pm2
pm2 -v
```

---

## 5. Nginx Reverse Proxy

```bash
cd /etc/nginx/sites-available
sudo nano nodeApp
```

```nginx
server {
    server_name 165.232.177.116;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:

```bash
sudo ln -s /etc/nginx/sites-available/nodeApp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

> Replace `165.232.177.116` with your server IP or domain.  
> Change `3000` if your app listens on a different port.

---

## 6. Start App with PM2

```bash
cd /path/to/your/node/project
pm2 start index.js --name="node-app"
pm2 status
pm2 logs node-app
```

---

## 7. Auto-Start PM2 on Reboot

Generate startup script:

```bash
pm2 startup
```

Run the command PM2 prints (example):

```bash
sudo env PATH=$PATH:/home/ubuntu/.nvm/versions/node/v20.x.x/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu
```

Save the process list:

```bash
pm2 save
```

Verify:

```bash
systemctl status pm2-ubuntu
```

Test by rebooting:

```bash
sudo reboot
```

After reconnecting:

```bash
pm2 status
```

---

## AWS / VPS Firewall

If your app runs on a custom port (not proxied through Nginx):

1. Open **Security Groups** in AWS (or your VPS firewall)
2. **Edit inbound rules**
3. Allow traffic on your application port

Then restart if needed:

```bash
pm2 restart node-app
```
