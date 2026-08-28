# Deploy Laravel on Ubuntu with Apache

Deploy a Laravel application on Ubuntu using Apache, MySQL, PHP, and Composer.

---

## 1. Update System & Install Packages

```bash
sudo apt-get update
sudo apt-get upgrade

sudo apt-get install zip unzip
sudo apt-get install apache2
sudo service apache2 restart

sudo apt install phpmyadmin php-mbstring php-zip php-gd php-json php-curl
sudo apt install mysql-server
```

---

## 2. Secure MySQL

```bash
sudo mysql_secure_installation
```

Log in and create your database:

```bash
sudo mysql -u root -p
```

```sql
CREATE DATABASE your_database_name;
SHOW DATABASES;
```

---

## 3. Install Composer

```bash
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
sudo chmod +x /usr/local/bin/composer

php -v
composer -V
```

---

## 4. Project Directory

Navigate to your project (upload or clone first):

```bash
cd /var/www/html/your-project
```

Set ownership:

```bash
sudo chown www-data:www-data -R /var/www/html/your_project
```

---

## 5. Apache Virtual Host

Create the site config:

```bash
sudo nano /etc/apache2/sites-available/your_project.conf
```

**Basic example** — replace `YOUR_DOMAIN_ADDRESS` with your domain or IP:

```apache
<VirtualHost *:80>
   ServerName YOUR_DOMAIN_ADDRESS
   DocumentRoot /var/www/html/your_project/
   <Directory /var/www/html/your_project/>
       AllowOverride All
       Require all granted
       Allow from all
   </Directory>
</VirtualHost>
```

**Recommended for Laravel** — point `DocumentRoot` to the `public/` folder:

```apache
<VirtualHost *:80>
   ServerName 172.31.40.101

   DocumentRoot /var/www/html/laravel-realworld-example-app-main/public/

   <Directory /var/www/html/laravel-realworld-example-app-main/public/>
        AllowOverride All
        Require all granted
        Allow from all
   </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

> You can use your EC2 internal IP, public IP, or domain as `ServerName`.

Enable the site and reload Apache:

```bash
sudo a2ensite your_project.conf
sudo systemctl reload apache2
```

---

## 6. Install Composer Dependencies

```bash
cd /var/www/html/your_project/
composer install
```

---

## 7. Set Permissions

Laravel needs write access to `storage/` and `bootstrap/cache/`:

```bash
sudo chmod 777 -R /var/www/html/your_project
sudo chown -R www-data storage
sudo chown -R www-data storage/framework
sudo chmod g+w -R storage
sudo chmod g+w -R storage/framework
sudo chmod g+w -R storage/framework/sessions/
sudo chmod g+w -R storage/logs/
```

Restart Apache:

```bash
sudo service apache2 restart
```

---

## 8. Debug Logs

If something goes wrong, check Laravel logs:

```bash
sudo nano /var/www/html/your-project/storage/logs/laravel.log
```
