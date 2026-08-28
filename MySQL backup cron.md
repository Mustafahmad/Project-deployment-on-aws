# MySQL Backup with Cron

Automated daily MySQL dumps on Ubuntu EC2.

---

## 1. Create Backup Directory

```bash
sudo mkdir -p /var/backups/mysql
sudo chown ubuntu:ubuntu /var/backups/mysql
```

---

## 2. Backup Script

```bash
nano ~/mysql-backup.sh
```

```bash
#!/bin/bash

# Configuration
DB_USER="my_user"
DB_PASS="my_password"
DB_NAME="my_database"
BACKUP_DIR="/var/backups/mysql"
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
FILENAME="${BACKUP_DIR}/${DB_NAME}_${DATE}.sql.gz"
KEEP_DAYS=7

# Create backup
mysqldump -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" | gzip > "$FILENAME"

# Remove backups older than KEEP_DAYS
find "$BACKUP_DIR" -name "*.sql.gz" -mtime +$KEEP_DAYS -delete

echo "Backup completed: $FILENAME"
```

Make executable:

```bash
chmod +x ~/mysql-backup.sh
```

---

## 3. Test Manually

```bash
~/mysql-backup.sh
ls -lh /var/backups/mysql/
```

---

## 4. Schedule with Cron

```bash
crontab -e
```

Daily at 2:00 AM:

```cron
0 2 * * * /home/ubuntu/mysql-backup.sh >> /var/log/mysql-backup.log 2>&1
```

---

## 5. Restore from Backup

```bash
gunzip -c /var/backups/mysql/my_database_2026-01-15_02-00-00.sql.gz | mysql -u my_user -p my_database
```

Or unzipped `.sql`:

```bash
mysql -u my_user -p my_database < backup.sql
```

---

## 6. Secure the Script

Restrict permissions — script contains password:

```bash
chmod 700 ~/mysql-backup.sh
```

Better: use `~/.my.cnf` instead of password in script:

```bash
nano ~/.my.cnf
```

```ini
[client]
user=my_user
password=my_password
```

```bash
chmod 600 ~/.my.cnf
```

Update script to omit `-p`:

```bash
mysqldump my_database | gzip > "$FILENAME"
```

---

## 7. Optional: Upload to S3

Install AWS CLI, then append to script:

```bash
aws s3 cp "$FILENAME" s3://your-backup-bucket/mysql/
```

Requires IAM credentials on EC2 instance role.

---

## Backup All Databases

```bash
mysqldump -u root -p --all-databases | gzip > all_databases_$(date +%F).sql.gz
```
