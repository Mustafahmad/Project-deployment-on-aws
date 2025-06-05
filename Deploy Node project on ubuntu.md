<h1>Node Project Setup</h1>


<h2 align="center">1. Nginx Installation on VPS </h2>


```bash
sudo apt update
sudo apt upgrade
sudo apt install nginx
```

<h2 align="center">2. Setup SSH Connection with GitHub and VPS </h2>
<h3>Method 1: Using ed25519 SSH Key</h3>

* Generate SSH keys:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

* Copy the public key:

```bash
cat .ssh/id_ed25519.pub
```
<h3>Method 2: Using rsa SSH Key</h3>

* Generate SSH keys:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

* Copy the public key:

```bash
cat .ssh/id_rsa.pu
```

* Paste the public key on GitHub:
- Go to GitHub > your project > Settings > Deploy Keys > Paste the key and save.

* Test the SSH connection to GitHub:

```bash
ssh -T git@github.com
```

<h3>Change Permissions for Folder When Git Cloning</h3>
<p>When cloning a Git repository, make sure to set proper permissions:</p>

```bash
sudo chown -R ubuntu:ubuntu /var/www/html

```
<h2 align="center">3. Install Node</h2>

```bash
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version && npm --version
```



<h2 align="center">4. Install PM-2 service</h2>

```bash
sudo npm i pm2 -g
```


<h2 align="center">5. Setup Nginx Server on Ip</h2>



```bash
cd /etc/nginx/sites-available/
sudo nano nodeApp

```
* Add the following configuration (adjust paths and domain as needed):

```bash
server{
    listen 80;
  	server_name 165.232.177.116;

      location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

```
* Create a symbolic link to the sites-enabled directory:

```bash
sudo ln -s /etc/nginx/sites-available/nodeApp /etc/nginx/sites-enabled/

```

* Test the Nginx configuration:

```bash
sudo nginx -t

```

* Restart Nginx to apply the changes:

```bash
sudo systemctl restart nginx
```

<h2 align="center">6. Start PM2 service </h2>

```bash
cd /path/to/your/node/project
pm2 start index.js --name="index"
pm2 status
pm2 logs index
```
* After running socket successfully on port you need to register your port in Security groups> Edit inbound rules > Allow traffic on this port > pm2 restart hooked
 

