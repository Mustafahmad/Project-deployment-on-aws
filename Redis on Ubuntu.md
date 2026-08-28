# Install Redis on Ubuntu

Use Redis for Laravel cache, sessions, and queues.

---

## 1. Install Redis

```bash
sudo apt update
sudo apt install redis-server -y
```

---

## 2. Start & Enable

```bash
sudo systemctl start redis-server
sudo systemctl enable redis-server
sudo systemctl status redis-server
```

---

## 3. Test Connection

```bash
redis-cli ping
```

Expected: `PONG`

---

## 4. Laravel `.env` Configuration

### Cache

```env
CACHE_DRIVER=redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

### Sessions

```env
SESSION_DRIVER=redis
```

### Queues

```env
QUEUE_CONNECTION=redis
```

Then:

```bash
php artisan config:cache
```

---

## 5. Secure Redis (Production)

Edit config:

```bash
sudo nano /etc/redis/redis.conf
```

Set bind to localhost only:

```
bind 127.0.0.1 ::1
```

Optional password:

```
requirepass your_strong_password
```

Update Laravel `.env`:

```env
REDIS_PASSWORD=your_strong_password
```

Restart:

```bash
sudo systemctl restart redis-server
```

---

## 6. Install PHP Redis Extension

```bash
sudo apt install php-redis -y
sudo systemctl restart php8.1-fpm
```

Adjust PHP version if needed.

---

## Useful Commands

```bash
redis-cli
KEYS *
FLUSHALL    # clear all keys — use carefully
INFO memory
```
