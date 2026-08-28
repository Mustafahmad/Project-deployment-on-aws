# Supervisor for Laravel Queue Workers

Keep `php artisan queue:work` running in production and restart it automatically if it crashes.

---

## 1. Install Supervisor

```bash
sudo apt update
sudo apt install supervisor -y
```

---

## 2. Create Worker Config

Copy the template from this repo or create manually:

```bash
sudo nano /etc/supervisor/conf.d/laravel-worker.conf
```

See [`supervisor/laravel-worker.conf`](./supervisor/laravel-worker.conf) for the full template.

Minimal example:

```ini
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/html/your_project/artisan queue:work --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=1
redirect_stderr=true
stdout_logfile=/var/www/html/your_project/storage/logs/worker.log
stopwaitsecs=3600
```

Replace `/var/www/html/your_project` with your path.

---

## 3. Start Worker

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start laravel-worker:*
```

---

## 4. Check Status

```bash
sudo supervisorctl status
```

Restart after deploy:

```bash
sudo supervisorctl restart laravel-worker:*
```

---

## 5. Logs

```bash
tail -f /var/www/html/your_project/storage/logs/worker.log
```

---

## After Code Deploy

Whenever you deploy new code that changes jobs or config:

```bash
php artisan queue:restart
sudo supervisorctl restart laravel-worker:*
```
