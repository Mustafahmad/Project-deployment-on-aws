# Common Deployment Errors

Quick fixes for errors seen during Laravel, Node, and Next.js deployments.

---

## HTTP 403 Forbidden

**Cause:** Wrong permissions or Nginx/Apache can't read files.

**Fix:**

```bash
sudo chown -R www-data:www-data /var/www/html/your_project
sudo chmod -R 755 /var/www/html/your_project
sudo chmod -R 775 storage bootstrap/cache
```

Check Nginx `root` points to Laravel `public/`:

```nginx
root /var/www/html/your_project/public;
```

---

## HTTP 502 Bad Gateway

**Cause:** Backend not running (PHP-FPM, PM2, Node).

**Fix:**

```bash
# Laravel / PHP
sudo systemctl status php8.1-fpm
sudo systemctl restart php8.1-fpm

# Node / Next.js
pm2 status
pm2 restart next-app
pm2 logs next-app
```

Check Nginx proxy port matches app:

```nginx
proxy_pass http://127.0.0.1:3000;
```

---

## HTTP 500 Internal Server Error (Laravel)

**Cause:** `.env` missing, wrong permissions, or app error.

**Fix:**

```bash
tail -f storage/logs/laravel.log
php artisan config:clear
php artisan cache:clear
```

Ensure:

```bash
php artisan key:generate
composer install
```

Temporarily debug (set back to `false` after):

```env
APP_DEBUG=true
```

---

## Permission Denied (storage/logs)

```bash
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

---

## Address Already in Use (Port 3000)

```bash
sudo lsof -i :3000
kill -9 <PID>
pm2 restart next-app
```

Or change port in `.env` / PM2 config.

---

## Killed (npm run build / composer install)

Out of memory on small EC2. See [Swap file guide](./Swap%20file%20for%20small%20EC2.md).

---

## Nginx: nginx: configuration file test failed

```bash
sudo nginx -t
```

Common fixes:

- Typo in config path
- Missing semicolon
- PHP socket path wrong: check `ls /run/php/`

---

## Certbot / SSL Failed

- DNS must point to server **before** running Certbot
- Port 80 must be open
- `server_name` must match domain exactly

```bash
dig yourdomain.com +short
sudo certbot renew --dry-run
```

---

## Git: Permission Denied (publickey)

```bash
ssh -T git@github.com
cat ~/.ssh/id_ed25519.pub
```

Add key to GitHub Deploy Keys. Clone **without** sudo.

---

## Database Connection Refused

```bash
sudo systemctl status mysql
mysql -u your_user -p -h 127.0.0.1
```

Check `.env` host: use `127.0.0.1` not `localhost` on some setups.

---

## React/Next: Blank Page After Refresh

Nginx SPA config missing:

```nginx
try_files $uri /index.html;
```

For S3/CloudFront, see [custom error pages](./S3%20CloudFront%20static%20deploy.md).

---

## CSRF Token Mismatch (Laravel)

```env
SESSION_DOMAIN=.yourdomain.com
APP_URL=https://yourdomain.com
```

```bash
php artisan config:cache
```

Ensure site accessed via same protocol (http vs https) as `APP_URL`.

---

## Still Stuck?

1. Check service logs: `journalctl -u nginx -e`
2. Check app logs: Laravel `storage/logs/`, `pm2 logs`
3. Verify firewall: [UFW](./UFW%20firewall%20ubuntu.md) + AWS Security Group
