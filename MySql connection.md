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

<h2> 2. Create a New Database </h2>

<p>Once logged in, you can create a new database by running the following command:</p>

```bash
CREATE DATABASE my_database;
```

<p>Replace my_database with the name you want for your database.</p>

<h2> 3. Create a New User </h2>

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


3.CREATE USER 'my_user'@'%' IDENTIFIED BY 'my_password';
The @'%' allows the user to connect from any host. If you only need to connect from localhost, use 'localhost' instead:

3.CREATE USER 'my_user'@'localhost' IDENTIFIED BY 'my_password';

Step 4: Grant Privileges to the User

4.GRANT ALL PRIVILEGES ON my_database.* TO 'my_user'@'%';

Step 5: Apply Changes:
Flush privileges to ensure the changes take effect:
1. FLUSH PRIVILEGES;

Step 6: Test the Connection
6.EXIT;

Then, test the connection:
7.mysql -u my_user -p -h localhost my_database


Step 7: import Sql file:

8. mysql -u username -p database_name < file.sql
