# Node Project Setup

---

## 1. Nginx Installation on VPS

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install nginx -y
```

---

## 2. Setup SSH Connection with GitHub and VPS

### Method 1: Using ed25519 SSH Key

Generate SSH key:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

Copy the public key:

```bash
cat ~/.ssh/id_ed25519.pub
```

---

### Method 2: Using RSA SSH Key

Generate SSH key:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

Copy the public key:

```bash
cat ~/.ssh/id_rsa.pub
```

Add the key to GitHub:

- Go to **GitHub → Repository → Settings**
- Click **Deploy Keys**
- Click **Add deploy key**
- Paste the public key and save

Test the SSH connection:

```bash
ssh -T git@github.com
```

---

### Change Folder Permissions for Git Clone

```bash
sudo chown -R ubuntu:ubuntu /var/www/html
```

---

# 3. Install Node.js (Node 20 using NVM)

Install **curl** (if not installed):

```bash
sudo apt install curl -y
```

Install **NVM (Node Version Manager)**:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Load NVM in the current terminal:

```bash
source ~/.bashrc
```

Verify NVM installation:

```bash
nvm --version
```

Install **Node.js 20**:

```bash
nvm install 20
```

Use Node 20:

```bash
nvm use 20
```

Set Node 20 as default:

```bash
nvm alias default 20
```

Verify installation:

```bash
node -v
npm -v
```

---

# 4. Install PM2 (Process Manager)

```bash
npm install -g pm2
```

Check PM2:

```bash
pm2 -v
```

---

# 5. Setup Nginx Server

Create a new Nginx configuration file:

```bash
cd /etc/nginx/sites-available
sudo nano nodeApp
```

Add this configuration:

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

Create symbolic link:

```bash
sudo ln -s /etc/nginx/sites-available/nodeApp /etc/nginx/sites-enabled/
```

Test nginx configuration:

```bash
sudo nginx -t
```

Restart nginx:

```bash
sudo systemctl restart nginx
```

---

# 6. Start Node App with PM2

Go to your project directory:

```bash
cd /path/to/your/node/project
```

Start the app:

```bash
pm2 start index.js --name="node-app"
```

Check status:

```bash
pm2 status
```

View logs:

```bash
pm2 logs node-app
```

---

# 7. Auto Start PM2 on Server Reboot

After starting your application with PM2, configure PM2 to automatically restart all processes when the server reboots.

Generate the startup script:

```bash
pm2 startup
```

PM2 will show a command similar to this:

```bash
sudo env PATH=$PATH:/home/ubuntu/.nvm/versions/node/v20.x.x/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu
```

Copy and run the command shown in your terminal.

---

Save the current PM2 process list:

```bash
pm2 save
```

---

Verify the startup service:

```bash
systemctl status pm2-ubuntu
```

---

Now your Node.js app will **automatically restart after VPS reboot**.

You can test it by rebooting the server:

```bash
sudo reboot
```

After reconnecting:

```bash
pm2 status
```

Your application should be running automatically.

## Important (AWS / VPS Firewall)

If your application runs on a custom port:

1. Go to **Security Groups**
2. Click **Edit inbound rules**
3. Allow traffic on your application port

Then restart PM2 if needed:

```bash
pm2 restart node-app
```