# PostgreSQL Setup on Ubuntu

Create database and user for Laravel or Node apps (alternative to MySQL).

---

## 1. Install PostgreSQL

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib -y
```

---

## 2. Start Service

```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
sudo systemctl status postgresql
```

---

## 3. Create Database & User

Switch to postgres user:

```bash
sudo -u postgres psql
```

Run SQL:

```sql
CREATE USER my_user WITH PASSWORD 'my_password';
CREATE DATABASE my_database OWNER my_user;
GRANT ALL PRIVILEGES ON DATABASE my_database TO my_user;
\q
```

---

## 4. Test Connection

```bash
psql -U my_user -h localhost -d my_database
```

Enter password when prompted.

---

## 5. Laravel `.env`

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=my_database
DB_USERNAME=my_user
DB_PASSWORD=my_password
```

Install PHP driver:

```bash
sudo apt install php-pgsql -y
sudo systemctl restart php8.1-fpm
```

Run migrations:

```bash
php artisan migrate --force
```

---

## 6. Import SQL Dump

```bash
psql -U my_user -h localhost -d my_database < backup.sql
```

---

## 7. Remote Access (Optional)

Edit `pg_hba.conf` and `postgresql.conf` only if another server needs access. Default: localhost only (recommended).

---

## Useful Commands

```bash
sudo -u postgres psql -l          # list databases
sudo -u postgres psql -c "\du"    # list users
pg_dump -U my_user my_database > backup.sql
```
