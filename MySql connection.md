# MySQL Configuration

Create a database, user, grant privileges, test the connection, and import an SQL file.

---

## 1. Log In to MySQL

```bash
sudo mysql
```

Or, if root has a password:

```bash
mysql -u root -p
```

---

## 2. Create a Database

```sql
CREATE DATABASE my_database;
```

Replace `my_database` with your database name.

---

## 3. Create a User

Allow connection from any host:

```sql
CREATE USER 'my_user'@'%' IDENTIFIED BY 'my_password';
```

Allow connection from localhost only:

```sql
CREATE USER 'my_user'@'localhost' IDENTIFIED BY 'my_password';
```

Replace `my_user` and `my_password` with your credentials.

---

## 4. Grant Privileges

```sql
GRANT ALL PRIVILEGES ON my_database.* TO 'my_user'@'%';
```

This gives `my_user` full access to `my_database`.

---

## 5. Apply Changes

```sql
FLUSH PRIVILEGES;
```

---

## 6. Test the Connection

Exit MySQL:

```sql
EXIT;
```

Test with the new user:

```bash
mysql -u my_user -p -h localhost my_database
```

Enter the password when prompted.

---

## 7. Import an SQL File

```bash
mysql -u my_user -p my_database < file.sql
```

Replace `my_user`, `my_database`, and `file.sql` with your values.
