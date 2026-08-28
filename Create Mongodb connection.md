# Install MongoDB (Community Edition) on Ubuntu

Install and run MongoDB 7.0 on Ubuntu using the official repository.

---

## 1. Import MongoDB GPG Key

```bash
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
  sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
  --dearmor
```

---

## 2. Add MongoDB Repository

```bash
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | \
  sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list > /dev/null
```

This uses your Ubuntu codename automatically (e.g. `focal`, `jammy`).

---

## 3. Install MongoDB

```bash
sudo apt update
sudo apt install -y mongodb-org
```

---

## 4. Start and Enable MongoDB

```bash
sudo systemctl start mongod
sudo systemctl enable mongod
sudo systemctl status mongod
```

Press `q` to exit the status screen.

---

## 5. Test Connection

```bash
mongosh
```

You should see a shell prompt like `test>`. Exit with:

```bash
exit
```

---

## Optional: Firewall (UFW)

Allow MongoDB port locally:

```bash
sudo ufw allow 27017
```

> In production, bind MongoDB to `localhost` unless you have authentication, TLS, and firewall rules in place.
