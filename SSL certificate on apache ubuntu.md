# SSL Certificate with Let's Encrypt (Apache on Ubuntu)

Secure an Apache-hosted site with a free HTTPS certificate from Let's Encrypt.

Use with: [Laravel on Apache](./Deploy%20Laravel%20Project%20on%20ubuntu%20using%20Apache.md)

---

## 1. Install Certbot for Apache

```bash
sudo apt update
sudo apt install certbot python3-certbot-apache -y
```

---

## 2. Verify Apache Virtual Host

Ensure your site config has the correct `ServerName`:

```bash
sudo nano /etc/apache2/sites-available/your_project.conf
```

```apache
<VirtualHost *:80>
    ServerName example.com
    ServerAlias www.example.com
    DocumentRoot /var/www/html/your_project/public
    ...
</VirtualHost>
```

Enable site and test Apache:

```bash
sudo a2ensite your_project.conf
sudo apache2ctl configtest
sudo systemctl reload apache2
```

Enable required modules:

```bash
sudo a2enmod rewrite ssl
sudo systemctl reload apache2
```

---

## 3. Obtain Certificate

```bash
sudo certbot --apache -d example.com -d www.example.com
```

For a **subdomain** only:

```bash
sudo certbot --apache -d api.example.com
```

Certbot will configure Apache for HTTPS automatically.

---

## 4. Verify Auto-Renewal

```bash
sudo systemctl status certbot.timer
```

Test renewal (dry run):

```bash
sudo certbot renew --dry-run
```

---

## Reference

- [Certbot Apache instructions](https://certbot.eff.org/instructions?ws=apache&os=ubuntufocal)
