## ✅ Step-by-Step: Install MongoDB (Community Edition)

### 🔹 Step 1: **Import MongoDB's Public GPG Key**

```bash
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
  sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
  --dearmor
```

---

### 🔹 Step 2: **Add MongoDB Repo to APT Sources**

```bash
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | \
  sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list > /dev/null
```

This command dynamically sets the Ubuntu codename (e.g., `focal`, `jammy`, etc.)

---

### 🔹 Step 3: **Update APT and Install MongoDB**

```bash
sudo apt update
sudo apt install -y mongodb-org
```

---

### 🔹 Step 4: **Start and Enable MongoDB**

```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

You can verify it's running with:

```bash
sudo systemctl status mongod
```

Press `q` to exit the status screen.

---

### 🔹 Step 5: **Test MongoDB**

Run the MongoDB shell:

```bash
mongosh
```

You should see a shell like this:

```bash
test>
```

You’re in! You can exit with:

```bash
exit
```

---

## 🧱 Optional: Enable Firewall (If Using UFW)

If you're using `ufw` and want to allow MongoDB access locally:

```bash
sudo ufw allow 27017
```

For production setups, it’s recommended to bind MongoDB only to `localhost` **unless you're securing it** (e.g., with authentication, TLS, firewall rules).

---
