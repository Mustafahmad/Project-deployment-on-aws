<h1>LEMP Stack Installation Guide</h1>


<h2 align="center">1. Nginx Installation on VPS </h2>


```bash
sudo apt update
sudo apt upgrade
sudo apt install nginx
```

<h2 align="center">2. Install MySQL and PHP on VPS </h2>
<h3>Install MySQL Server:</h3>

```bash
sudo apt install mysql-server
```

<h3>Install PHP and PHP-FPM:</h3>

* To install PHP and PHP-FPM, use the following command:

```bash
sudo apt install php-fpm php-mysql
```
<p>If you need a specific PHP version (e.g., PHP 8.1):</p>

```bash
sudo apt install php8.1 php8.1-fpm php8.1-mysql
```

<h3>Check PHP-FPM Status:</h3>
<p>To check if PHP-FPM is running:</p>

```bash
sudo service php8.1-fpm status
```

<h3>Check Nginx Status:</h3>
<p>To check if Nginx is running:</p>

```bash
sudo service nginx status
```

<h3>Install Composer:</h3>

```bash
sudo apt install composer
```

<h2 align="center">3. Setup SSH Connection with GitHub and VPS </h2>
<h3>Method 1: Using ed25519 SSH Key</h3>

* Generate SSH keys:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

* Copy the public key:

```bash
cat .ssh/id_ed25519.pub
```
<h3>Method 2: Using rsa SSH Key</h3>

* Generate SSH keys:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

* Copy the public key:

```bash
cat .ssh/id_rsa.pu
```

* Paste the public key on GitHub:
- Go to GitHub > your project > Settings > Deploy Keys > Paste the key and save.

* Test the SSH connection to GitHub:

```bash
ssh -T git@github.com
```

<h3>Change Permissions for Folder When Git Cloning</h3>
<p>When cloning a Git repository, make sure to set proper permissions:</p>

```bash
sudo chown -R ubuntu:ubuntu /var/www/html

```

<p>You can use your username instead of ubuntu as appropriate.</p>

* Note: Run git **clone** command without **sudo** on the server.


<h2 align="Center">4. Set Up Nginx Server on Your IP</h2>

* Navigate to the **sites-available** directory:

```bash
cd /etc/nginx/sites-available/

```

* Create and edit your Nginx configuration file:

```bash
sudo nano laravel_project

```

* Add the following configuration (adjust paths and domain as needed):

```bash

server {
    listen 80;
    server_name your_domain.com;  # Replace with your domain
    root /var/www/html/laravel_project/public;  # Path to your Laravel project
    index index.php index.html index.htm;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.1-fpm.sock;  # Adjust PHP version if needed
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}

```
* Create a symbolic link to the sites-enabled directory:

```bash
sudo ln -s /etc/nginx/sites-available/laravel_project /etc/nginx/sites-enabled/

```

* Test the Nginx configuration:

```bash
sudo nginx -t

```

* Restart Nginx to apply the changes:

```bash
sudo systemctl restart nginx
```
<h2 align="center">5. Set Permissions for Storage and Bootstrap Folders</h2>
<p>To make the storage and bootstrap folders writable:</p>

```bash
sudo chmod 777 -R storage/
sudo chmod 777 -R bootstrap/

```


<h3>Delete File Command:-</h3>

```bash 
rm -f file_name
``` 

<h3>Make Folder Command:-</h3>

```bash
sudo makdir foldername
```
<p>For More reference you can look for this file as well</p>

[Reference][1]

[1]: https://github.com/geekyshow1/GeekyShowsNotes/blob/main/LEMP_Stack_Installation.md
