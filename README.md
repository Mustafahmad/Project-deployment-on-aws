# Project Deployment Guides

Step-by-step commands for deploying Laravel, Node.js, React, and Next.js on Ubuntu VPS / AWS EC2 — plus shared hosting (Hostinger) and AWS static hosting.

These are personal deployment notes — tested and used in production. Each guide is self-contained; combine as needed.

**New here?** Start with [EC2 Initial Setup](./EC2%20initial%20setup.md) → pick your stack → [DNS](./Route%2053%20DNS%20setup.md) → [SSL](./SSL%20certificate%20on%20nginx%20ubuntu.md).

---

## Application Deployment

| Guide | Stack | Server |
|-------|-------|--------|
| [Laravel on Ubuntu (Nginx / LEMP)](./Deploy%20Laravel%20Project%20On%20Ubuntu%20(Aws).md) | PHP, Nginx, MySQL, Composer | Ubuntu (AWS EC2) |
| [Laravel on Ubuntu (Apache)](./Deploy%20Laravel%20Project%20on%20ubuntu%20using%20Apache.md) | PHP, Apache, MySQL, Composer | Ubuntu |
| [Laravel on Amazon Linux (Nginx)](./Linux%20Laravel%20Server%20Using%20Nginx.md) | PHP, Nginx | Amazon Linux |
| [Laravel on Hostinger](./Laravel%20on%20Hostinger.md) | PHP, Apache, MySQL | Shared hosting |
| [Laravel Post-Deploy Checklist](./Laravel%20post-deploy%20checklist.md) | Artisan, cache, cron | After any Laravel deploy |
| [Node.js on Ubuntu](./Deploy%20Node%20project%20on%20ubuntu.md) | Node 20, NVM, PM2, Nginx | Ubuntu VPS |
| [Next.js on EC2](./Deploy%20Next.js%20project%20on%20EC2.md) | Node 20, NVM, PM2, Nginx | AWS EC2 |
| [React on Ubuntu](./Deploy%20React%20project%20on%20Ubuntu.md) | Node 20, PM2, Nginx | Ubuntu VPS |
| [Static Site (S3 + CloudFront)](./S3%20CloudFront%20static%20deploy.md) | S3, CloudFront, ACM | AWS (no server) |

---

## AWS & Server Setup

| Guide | Description |
|-------|-------------|
| [EC2 Initial Setup](./EC2%20initial%20setup.md) | Launch instance, SSH, Elastic IP, first steps |
| [Route 53 / DNS Setup](./Route%2053%20DNS%20setup.md) | Point domain to EC2 (Route 53, Cloudflare, Hostinger) |
| [UFW Firewall](./UFW%20firewall%20ubuntu.md) | Allow SSH, HTTP, HTTPS on Ubuntu |
| [Swap File (Small EC2)](./Swap%20file%20for%20small%20EC2.md) | Fix OOM during npm/composer builds |
| [GitHub Actions → EC2 Deploy](./GitHub%20Actions%20deploy%20to%20EC2.md) | Auto-deploy Laravel, Node, Next.js on push |

---

## Database Setup

| Guide | Description |
|-------|-------------|
| [MySQL Configuration](./MySql%20connection.md) | Create database, user, grant privileges, import SQL |
| [MySQL Backup (Cron)](./MySQL%20backup%20cron.md) | Automated daily mysqldump |
| [PostgreSQL Setup](./PostgreSQL%20setup.md) | Install PostgreSQL, create user & database |
| [MongoDB Installation](./Create%20Mongodb%20connection.md) | MongoDB Community Edition on Ubuntu |
| [Redis on Ubuntu](./Redis%20on%20Ubuntu.md) | Cache, sessions, queues for Laravel |

---

## Security & SSL

| Guide | Description |
|-------|-------------|
| [SSL (Let's Encrypt + Nginx)](./SSL%20certificate%20on%20nginx%20ubuntu.md) | HTTPS with Certbot on Nginx |
| [SSL (Let's Encrypt + Apache)](./SSL%20certificate%20on%20apache%20ubuntu.md) | HTTPS with Certbot on Apache |

---

## Background Jobs & Process Managers

| Guide | Description |
|-------|-------------|
| [Supervisor for Laravel Queues](./Supervisor%20for%20Laravel%20queues.md) | Keep `queue:work` running in production |

---

## Shared Hosting

For **Hostinger**, cPanel, and Apache hosts where document root can't point to `public/`.

| Resource | Description |
|----------|-------------|
| [Shared Hosting Guide](./shared-hosting/README.md) | Folder structure and `.htaccess` setup |
| [Laravel on Hostinger (full guide)](./Laravel%20on%20Hostinger.md) | PHP, MySQL, cron, SSL on Hostinger |
| [`laravel-root.htaccess`](./shared-hosting/laravel-root.htaccess) | Root redirect → `public/` |
| [public/.htaccess notes](./shared-hosting/laravel-public-htaccess-notes.md) | Troubleshooting assets & routes |

---

## Config Templates

Copy-paste configs — adjust paths and domains before use.

| File | Use for |
|------|---------|
| [`nginx/laravel.conf`](./nginx/laravel.conf) | Laravel Nginx site block |
| [`nginx/nextjs-reverse-proxy.conf`](./nginx/nextjs-reverse-proxy.conf) | Next.js / Node PM2 reverse proxy |
| [`pm2/ecosystem.nextjs.config.js`](./pm2/ecosystem.nextjs.config.js) | PM2 config for Next.js |
| [`supervisor/laravel-worker.conf`](./supervisor/laravel-worker.conf) | Laravel queue worker |

---

## Troubleshooting

| Guide | Description |
|-------|-------------|
| [Common Deployment Errors](./Common%20deployment%20errors.md) | 403, 502, 500, permissions, SSL, git, DB |

---

## Quick Reference

Replace these placeholders in every guide:

| Placeholder | Replace with |
|-------------|--------------|
| `your_project` / `your-project` | Your project folder name |
| `your_domain.com` | Your domain or server IP |
| `your_database_name` | MySQL/PostgreSQL database name |
| `your_email@example.com` | Your email (for SSH keys) |

---

## Useful Commands

```bash
# Delete a file
rm -f file_name

# Create a folder
sudo mkdir folder_name

# Check Nginx config
sudo nginx -t

# Restart services
sudo systemctl restart nginx
sudo systemctl restart apache2
sudo systemctl restart php8.1-fpm

# PM2
pm2 status
pm2 restart next-app
pm2 logs next-app

# Laravel
php artisan config:cache
tail -f storage/logs/laravel.log
```
