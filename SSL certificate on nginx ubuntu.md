# SSL Certificate with Let's Encrypt (Nginx on Ubuntu)

Secure your Nginx site with a free HTTPS certificate from Let's Encrypt using Certbot.

---

## 1. Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx
```

---

## 2. Verify Nginx Configuration

Open your site config:

```bash
sudo nano /etc/nginx/sites-available/example.com
```

Ensure `server_name` includes your domain:

```nginx
server_name example.com www.example.com;
```

Check syntax:

```bash
sudo nginx -t
```

---

## 3. Obtain Certificate

```bash
sudo certbot --nginx -d example.com -d www.example.com
```

> For a **subdomain** only (e.g. `api.example.com`), omit `www`:

```bash
sudo certbot --nginx -d api.example.com
```

Certbot will automatically update your Nginx config for HTTPS.

---

## 4. Verify Auto-Renewal

Certbot sets up a timer to renew certificates before they expire:

```bash
sudo systemctl status certbot.timer
```

---

## Reference

- [DigitalOcean: Secure Nginx with Let's Encrypt on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04#step-5-verifying-certbot-auto-renewal)
