# Project Deployment Guides

Step-by-step commands for deploying Laravel, Node.js, and React projects on Ubuntu VPS / AWS EC2.

These are personal deployment notes — tested and used in production setups. Each guide is self-contained; combine them as needed (e.g. Laravel + MySQL + SSL).

---

## Application Deployment

| Guide | Stack | Server |
|-------|-------|--------|
| [Laravel on Ubuntu (Nginx / LEMP)](./Deploy%20Laravel%20Project%20On%20Ubuntu%20(Aws).md) | PHP, Nginx, MySQL, Composer | Ubuntu (AWS EC2) |
| [Laravel on Ubuntu (Apache)](./Deploy%20Laravel%20Project%20on%20ubuntu%20using%20Apache.md) | PHP, Apache, MySQL, Composer | Ubuntu |
| [Laravel on Amazon Linux (Nginx)](./Linux%20Laravel%20Server%20Using%20Nginx.md) | PHP, Nginx | Amazon Linux |
| [Node.js on Ubuntu](./Deploy%20Node%20project%20on%20ubuntu.md) | Node 20, NVM, PM2, Nginx | Ubuntu VPS |
| [React on Ubuntu](./Deploy%20React%20project%20on%20Ubuntu.md) | Node 20, PM2, Nginx | Ubuntu VPS |

---

## Database Setup

| Guide | Description |
|-------|-------------|
| [MySQL Configuration](./MySql%20connection.md) | Create database, user, grant privileges, import SQL |
| [MongoDB Installation](./Create%20Mongodb%20connection.md) | Install MongoDB Community Edition on Ubuntu |

---

## Security

| Guide | Description |
|-------|-------------|
| [SSL Certificate (Let's Encrypt + Nginx)](./SSL%20certificate%20on%20nginx%20ubuntu.md) | HTTPS with Certbot on Ubuntu |

---

## Shared Hosting (Coming Soon)

Guides and config files for shared hosts (e.g. **Hostinger**) where the document root cannot point directly to Laravel's `public/` folder.

Planned additions:

- `.htaccess` — redirect all requests to the `public/` directory
- Notes on folder structure for shared hosting

---

## Quick Reference

Replace these placeholders in every guide:

| Placeholder | Replace with |
|-------------|--------------|
| `your_project` / `your-project` | Your project folder name |
| `your_domain.com` | Your domain or server IP |
| `your_database_name` | MySQL database name |
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
```
