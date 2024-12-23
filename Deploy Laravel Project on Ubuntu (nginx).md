<!-- <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LEMP Stack Installation Guide</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        h1, h2 {
            color: #333;
        }
        pre {
            background-color: #333;
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-size: 1rem;
            overflow-x: auto;
        }
        code {
            background-color: #f4f4f4;
            padding: 0.2rem;
            border-radius: 3px;
        }
        ul {
            list-style-type: disc;
            margin-left: 20px;
        }
        li {
            margin-bottom: 10px;
        }
        .note {
            background-color: #e0f7fa;
            border-left: 5px solid #00bcd4;
            padding: 10px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body> -->

    <h1>LEMP Stack Installation Guide</h1>

    <p>Follow this step-by-step guide to install Nginx, MySQL, PHP, and set up your project on a VPS.</p>

    <h2>1. Install Nginx on VPS</h2>
    <ul>
        <li><code>sudo apt update</code> - Update package information.</li>
        <li><code>sudo apt upgrade</code> - Upgrade installed packages.</li>
        <li><code>sudo apt install nginx</code> - Install Nginx.</li>
    </ul>

    <h2>2. Install MySQL and PHP on VPS</h2>
    <ul>
        <li><code>sudo apt install mysql-server</code> - Install MySQL server.</li>
        <li><code>sudo apt install php-fpm php-mysql</code> - Install PHP and MySQL extension for PHP.</li>
        <li><code>sudo apt install php8.1 php8.1-fpm php8.1-mysql</code> - Install specific PHP version (e.g., PHP 8.1).</li>
        <li><code>sudo service php8.1-fpm status</code> - Check if PHP-FPM is running.</li>
        <li><code>sudo service nginx status</code> - Check if Nginx is running.</li>
        <li><code>sudo apt install composer</code> - Install Composer (PHP dependency manager).</li>
    </ul>

    <h2>3. SSH Connection with GitHub and VPS</h2>
    <p>Choose one of the following methods to set up SSH connection.</p>

    <h3>Method 1: Using ED25519</h3>
    <ul>
        <li><code>ssh-keygen -t ed25519 -C "your_email@example.com"</code> - Generate SSH keys.</li>
        <li><code>cat .ssh/id_ed25519.pub</code> - Copy the public key.</li>
        <li>Paste the public key into GitHub: <code>Settings > Deploy Keys</code>, then save.</li>
        <li><code>ssh -T git@github.com</code> - Test the SSH connection to GitHub.</li>
    </ul>

    <h3>Method 2: Using RSA</h3>
    <ul>
        <li><code>ssh-keygen -t rsa -b 4096 -C "your_email@example.com"</code> - Generate SSH keys.</li>
        <li><code>cat .ssh/id_rsa.pub</code> - Copy the public key.</li>
        <li>Paste the public key into GitHub: <code>Settings > Deploy Keys</code>, then save.</li>
        <li><code>ssh -T git@github.com</code> - Test the SSH connection to GitHub.</li>
    </ul>

    <p><strong>Note:</strong> Make sure to set folder permissions correctly for cloning Git repositories:</p>
    <ul>
        <li><code>sudo chown -R ubuntu apps</code> or <code>sudo chown -R yourusername /var/www</code> - Change ownership of your project directory.</li>
        <li>Run <code>git clone</code> commands without <code>sudo</code>.</li>
    </ul>

    <h2>4. Setup Nginx Server for Laravel Project</h2>
    <ul>
        <li><code>cd /etc/nginx/sites-available/</code> - Navigate to the Nginx config folder.</li>
        <li><code>sudo nano laravel_project</code> - Create a new Nginx configuration file for your Laravel project.</li>
    </ul>
    <p>Paste the following configuration into the file:</p>

    <pre><code>server {
    listen 80;
    server_name your_domain.com;
    root /var/www/html/laravel_project/public; # Adjust this path to the public directory of your Laravel project
    index index.php index.html index.htm;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.1-fpm.sock; # Adjust this path according to your PHP version
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}</code></pre>

    <ul>
        <li><code>sudo ln -s /etc/nginx/sites-available/laravel_project /etc/nginx/sites-enabled/</code> - Enable the Nginx site.</li>
        <li><code>sudo nginx -t</code> - Test the Nginx configuration.</li>
        <li><code>sudo systemctl restart nginx</code> - Restart Nginx to apply the changes.</li>
    </ul>

    <h2>5. Set Permissions for Storage and Bootstrap Folders</h2>
    <ul>
        <li><code>sudo chmod 777 -R storage/</code> - Set writable permissions for the storage folder.</li>
        <li><code>sudo chmod 777 -R bootstrap/</code> - Set writable permissions for the bootstrap folder.</li>
    </ul>

    <h2>6. Additional Commands</h2>
    <p>Useful commands for server management:</p>
    <ul>
        <li><code>rm -f file_name</code> - Delete a file.</li>
        <li><code>sudo mkdir foldername</code> - Create a new directory.</li>
    </ul>

    <p class="note">For detailed instructions, you can refer to the official documentation: <a href="https://github.com/geekyshow1/GeekyShowsNotes/blob/main/LEMP_Stack_Installation.md">LEMP Stack Installation</a></p>

</body>
</html>
