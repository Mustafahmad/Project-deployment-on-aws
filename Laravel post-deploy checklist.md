# Laravel Post-Deploy Checklist

Run these commands **after** your server stack (Nginx/Apache, PHP, MySQL) is ready and your project is on the server.

Use with: [Laravel Nginx](./Deploy%20Laravel%20Project%20On%20Ubuntu%20(Aws).md) · [Laravel Apache](./Deploy%20Laravel%20Project%20on%20ubuntu%20using%20Apache.md) · [Hostinger](./Laravel%20on%20Hostinger.md)

---

## 1. Go to Project Directory

```bash
cd /var/www/html/your_project
```

---

## 2. Environment File

```bash
cp .env.example .env
nano .env
```

Set at minimum:

```env
APP_NAME=YourApp
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your_domain.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_user
DB_PASSWORD=your_password
```

Generate application key:

```bash
php artisan key:generate
```

---

## 3. Install Dependencies

```bash
composer install --optimize-autoloader --no-dev
```

For frontend assets (if using Vite/npm):

```bash
npm install
npm run build
```

---

## 4. Database

```bash
php artisan migrate --force
```

Optional seed:

```bash
php artisan db:seed --force
```

---

## 5. Storage & Cache

Link public storage:

```bash
php artisan storage:link
```

Clear and cache config for production:

```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## 6. Permissions

```bash
sudo chown -R www-data:www-data /var/www/html/your_project
sudo chmod -R 775 storage bootstrap/cache
```

On some setups `www-data` is the web user; on others use `apache` or `nginx`.

---

## 7. Queue Worker (If Using Queues)

See [Supervisor for Laravel Queues](./Supervisor%20for%20Laravel%20queues.md).

```bash
php artisan queue:work
```

---

## 8. Scheduler (Cron)

Add to crontab (`crontab -e`):

```cron
* * * * * cd /var/www/html/your_project && php artisan schedule:run >> /dev/null 2>&1
```

On Hostinger: use the **Cron Jobs** panel with the same command.

---

## 9. Verify

```bash
php artisan about
curl -I http://your_domain.com
```

Check logs if something fails:

```bash
tail -f storage/logs/laravel.log
```

---

## Quick One-Liner (After .env Is Ready)

```bash
composer install --optimize-autoloader --no-dev && \
php artisan key:generate --force && \
php artisan migrate --force && \
php artisan storage:link && \
php artisan config:cache && \
php artisan route:cache && \
php artisan view:cache
```
