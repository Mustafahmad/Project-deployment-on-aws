# Deploy Laravel on Hostinger

Full guide for running Laravel on Hostinger shared hosting (Apache + PHP + MySQL).

Related: [Root `.htaccess`](./shared-hosting/laravel-root.htaccess) · [Post-deploy checklist](./Laravel%20post-deploy%20checklist.md)

---

## 1. Check PHP Version

In **hPanel → Advanced → PHP Configuration**, select **PHP 8.1+** (Laravel 10/11 requirement).

Enable extensions: `openssl`, `pdo`, `mbstring`, `tokenizer`, `xml`, `ctype`, `json`, `bcmath`, `fileinfo`.

---

## 2. Upload Project

Upload via **File Manager** or FTP to `public_html/` (or your domain folder):

```
public_html/
├── app/
├── bootstrap/
├── config/
├── public/
├── routes/
├── storage/
├── vendor/
├── .env
└── .htaccess          ← from laravel-root.htaccess
```

Or clone via SSH (if enabled on your plan):

```bash
cd ~/domains/yourdomain.com/public_html
git clone git@github.com:your-username/your-laravel-app.git .
```

---

## 3. Root `.htaccess`

Copy [`shared-hosting/laravel-root.htaccess`](./shared-hosting/laravel-root.htaccess) to project root and rename to `.htaccess`.

Keep the default `.htaccess` inside `public/` — do not delete it.

---

## 4. Create MySQL Database

In **hPanel → Databases → MySQL Databases**:

1. Create a database
2. Create a user and assign to the database
3. Note host (often `localhost`), database name, username, password

---

## 5. Configure `.env`

```env
APP_NAME=YourApp
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=u123456789_dbname
DB_USERNAME=u123456789_user
DB_PASSWORD=your_password
```

Run via SSH or Hostinger terminal:

```bash
composer install --optimize-autoloader --no-dev
php artisan key:generate
php artisan migrate --force
php artisan storage:link
php artisan config:cache
```

See [Laravel post-deploy checklist](./Laravel%20post-deploy%20checklist.md) for full steps.

---

## 6. Permissions

```bash
chmod -R 775 storage bootstrap/cache
```

If uploads fail, also check `storage/app/public`.

---

## 7. Cron Job (Scheduler)

In **hPanel → Advanced → Cron Jobs**, add:

```cron
* * * * * cd /home/u123456789/domains/yourdomain.com/public_html && php artisan schedule:run >> /dev/null 2>&1
```

Adjust path to match your Hostinger account path.

---

## 8. SSL

Hostinger provides free SSL in **hPanel → Security → SSL**. Enable for your domain after DNS is pointed.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 500 error | Check `storage/logs/laravel.log`, enable debug briefly |
| CSS/JS 404 | Set `APP_URL` correctly; run `php artisan config:cache` |
| Database connection failed | Use Hostinger DB host from panel (usually `localhost`) |
| Composer not found | Use SSH or upload `vendor/` from local `composer install` |

See also: [public/.htaccess notes](./shared-hosting/laravel-public-htaccess-notes.md)
