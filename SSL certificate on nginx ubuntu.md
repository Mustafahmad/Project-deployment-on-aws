<h2 align="center">How To Secure Nginx with Let's Encrypt on Ubuntu 20.04</h2>

1. Install Certbot and it’s Nginx plugin with apt:

```bash
    sudo apt install certbot python3-certbot-nginx
```

To check, open the configuration file for your domain using nano or your favorite text editor:

```bash
sudo nano /etc/nginx/sites-available/example.com
```

<h2>Find the existing server_name line. It should look like this: </h2>

```bash
server_name example.com www.example.com;
```

<h2>Check nginx syntax error</h2>

```bash
sudo nginx -t
sudo certbot --nginx -d example.com -d www.example.com  ##   (depending upon the doamin, if it is subdomain don't add www.example.com )
```

<h2>Verifying Certbot Auto-Renewal </h2>

 ````bash
sudo systemctl status certbot.timer
```


<p>Blog to refer</p>

Blog: https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04#step-5-verifying-certbot-auto-renewal
````
