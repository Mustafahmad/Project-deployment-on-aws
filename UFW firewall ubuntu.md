# UFW Firewall on Ubuntu (EC2 / VPS)

Configure the server firewall to allow only SSH, HTTP, and HTTPS.

---

## 1. Install UFW

Usually pre-installed on Ubuntu:

```bash
sudo apt install ufw -y
```

---

## 2. Default Rules

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

---

## 3. Allow Required Ports

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

If SSH uses a custom port (e.g. 2222):

```bash
sudo ufw allow 2222/tcp
```

---

## 4. Enable UFW

```bash
sudo ufw enable
```

Confirm when prompted.

---

## 5. Check Status

```bash
sudo ufw status verbose
```

Expected output:

```
Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
80/tcp                     ALLOW       Anywhere
443/tcp                    ALLOW       Anywhere
```

---

## AWS Security Groups

UFW runs **on the server**. You still need EC2 **Security Group** inbound rules:

| Type  | Port | Source    |
|-------|------|-----------|
| SSH   | 22   | Your IP   |
| HTTP  | 80   | 0.0.0.0/0 |
| HTTPS | 443  | 0.0.0.0/0 |

Both layers should match — Security Group at AWS level, UFW at OS level.

---

## Useful Commands

```bash
# Remove a rule
sudo ufw delete allow 80/tcp

# Disable firewall
sudo ufw disable

# Reset all rules
sudo ufw reset
```
