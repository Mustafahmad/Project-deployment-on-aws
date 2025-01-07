# MySQL Configuration Tutorial

This tutorial will guide you through the steps to configure a MySQL server by creating a new database, a new user, granting privileges, and testing the connection.

## 1. Log in to the MySQL Server

To begin, log in to your MySQL server using either of the following commands:

```bash
sudo mysql

```
<p>Or, if you have a password set for the root user:</p>

```bash
mysql -u root -p
```

<h2 align="center"> 2. Create a New Database </h2>

<p>Once logged in, you can create a new database by running the following command:</p>

```bash
CREATE DATABASE my_database;
```

<p>Replace my_database with the name you want for your database.</p>

<h2 align="center"> 3. Create a New User </h2>

<p> To create a new user, run the following command: </p>

```bash
CREATE USER 'my_user'@'%' IDENTIFIED BY 'my_password';

```
* The @'%' means that the user can connect from any host.

* If you only need the user to connect from the local machine, replace '%' with 'localhost':

```bash
CREATE USER 'my_user'@'localhost' IDENTIFIED BY 'my_password';

```
<p> Make sure to replace my_user with the username and my_password with the user's password.</p>

```bash
CREATE USER 'my_user'@'localhost' IDENTIFIED BY 'my_password';

```

<p>Make sure to replace my_user with the username and my_password with the user's password.</p>



<h2>4. Grant Privileges to the User</h2>

<p>Now, grant the new user all privileges to the database you created. Run the following command:</p>

```bash
GRANT ALL PRIVILEGES ON my_database.* TO 'my_user'@'%';
```

<p>This command allows the user my_user to have full access to the my_database.</p>

<h2>5. Apply Changes </h2>
After granting privileges, flush the privileges to apply the changes:
```bash
FLUSH PRIVILEGES;
```
<h2>6. Test the Connection</h2>
 
<p>Exit MySQL by typing:</p>

```bash
EXIT;
```

<p>Then, test the connection to the MySQL server using the new user:</p>

```bash
mysql -u my_user -p -h localhost my_database

```
<p>You'll be prompted to enter the password you set for my_user.</p>

<h2>7. Import an SQL File</h2>
<p>If you want to import an SQL file into your database, use the following command:</p>

```bash
mysql -u my_user -p my_database < file.sql
```

<p>Replace my_user with your MySQL username, my_database with the name of your database, and file.sql with the path to the SQL file you want to import.</p>











Step 5: Apply Changes:
Flush privileges to ensure the changes take effect:
1. FLUSH PRIVILEGES;

Step 6: Test the Connection
6.EXIT;

Then, test the connection:
7.mysql -u my_user -p -h localhost my_database


Step 7: import Sql file:

8. mysql -u username -p database_name < file.sql
