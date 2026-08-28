# Deploy Next.js on AWS EC2 (PM2 + Nginx)

Run a Next.js app in production on Ubuntu EC2 using NVM, PM2, and Nginx as a reverse proxy.

---

## 1. Connect to EC2 & Update System

```bash
ssh -i your-key.pem ubuntu@your_ec2_ip

sudo apt update
sudo apt upgrade -y
```

---

## 2. Install Nginx

```bash
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

---

## 3. SSH Connection with GitHub

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

---

## 4. Install Node.js 20 (NVM)

```bash
sudo apt install curl -y

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc

nvm install 20
nvm use 20
nvm alias default 20

node -v
npm -v
```

---

## 5. Install PM2

```bash
npm install -g pm2
pm2 -v
```

---

## 6. Clone & Build Next.js App

```bash
sudo mkdir -p /var/www
sudo chown -R ubuntu:ubuntu /var/www

cd /var/www
git clone git@github.com:your-username/your-next-app.git
cd your-next-app

npm install
```

Create production environment file:

```bash
nano .env.production
```

Example:

```env
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_API_URL=https://your-api.com
```

Build the app:

```bash
npm run build
```

> Build must succeed before starting with PM2. Fix any TypeScript or env errors first.

---

## 7. Start Next.js with PM2

From the project directory:

```bash
pm2 start npm --name "next-app" -- start
```

Or with an explicit port:

```bash
PORT=3000 pm2 start npm --name "next-app" -- start
```

Check status and logs:

```bash
pm2 status
pm2 logs next-app
```

Restart after code changes:

```bash
git pull
npm install
npm run build
pm2 restart next-app
```

---

## 8. PM2 Ecosystem File (Optional)

For a cleaner setup, create `ecosystem.config.js` in the project root:

```javascript
module.exports = {
  apps: [
    {
      name: 'next-app',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/your-next-app',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
```

Start with:

```bash
pm2 start ecosystem.config.js
pm2 save
```

---

## 9. Nginx Reverse Proxy

```bash
cd /etc/nginx/sites-available
sudo nano next-app
```

```nginx
server {
    listen 80;
    server_name your_domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:

```bash
sudo ln -s /etc/nginx/sites-available/next-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

> Replace `your_domain.com` with your domain or EC2 public IP.  
> Nginx listens on port 80 — users don't need to open port 3000 publicly.

---

## 10. Auto-Start PM2 on Reboot

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

Verify after reboot:

```bash
sudo reboot
# reconnect via SSH
pm2 status
```

---

## 11. AWS Security Group

In the EC2 console, allow inbound traffic:

| Type  | Port | Source    |
|-------|------|-----------|
| HTTP  | 80   | 0.0.0.0/0 |
| HTTPS | 443  | 0.0.0.0/0 |
| SSH   | 22   | Your IP   |

Port **3000** does not need to be public — Nginx proxies to it locally.

For HTTPS, use the [SSL Certificate guide](./SSL%20certificate%20on%20nginx%20ubuntu.md) after Nginx is working on port 80.

---

## Quick Deploy Script

Run on the server after initial setup:

```bash
cd /var/www/your-next-app
git pull origin main
npm install
npm run build
pm2 restart next-app
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `502 Bad Gateway` | Check PM2 is running: `pm2 status`. Restart: `pm2 restart next-app` |
| App works on `:3000` but not domain | Check Nginx config and `sudo nginx -t` |
| Build fails on EC2 | EC2 t2.micro may run out of memory — add swap or use a larger instance for build |
| Env vars not applied | Use `.env.production` or set vars in `ecosystem.config.js`, then `pm2 restart next-app` |
| Changes not showing | Run `npm run build` again before `pm2 restart` |
