# AWS EC2 Initial Setup

First-time setup for a new EC2 instance before deploying any application.

---

## 1. Launch EC2 Instance

In **AWS Console → EC2 → Launch Instance**:

| Setting | Recommendation |
|---------|----------------|
| AMI | Ubuntu 22.04 LTS |
| Instance type | t2.micro (free tier) or t3.small for production |
| Key pair | Create new `.pem` — download and keep safe |
| Storage | 20–30 GB gp3 |

---

## 2. Security Group (Inbound Rules)

| Type  | Port | Source    | Purpose |
|-------|------|-----------|---------|
| SSH   | 22   | Your IP   | Server access |
| HTTP  | 80   | 0.0.0.0/0 | Web traffic |
| HTTPS | 443  | 0.0.0.0/0 | HTTPS |

Do not expose app ports (3000, 8000) publicly — use Nginx reverse proxy.

---

## 3. Elastic IP (Recommended)

**EC2 → Elastic IPs → Allocate → Associate** with your instance.

Without Elastic IP, your public IP changes on stop/start.

---

## 4. Connect via SSH

**Linux / macOS:**

```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@your_ec2_public_ip
```

**Windows (PowerShell):**

```powershell
ssh -i C:\path\to\your-key.pem ubuntu@your_ec2_public_ip
```

Default user is `ubuntu` for Ubuntu AMI.

---

## 5. Initial Server Setup

```bash
sudo apt update && sudo apt upgrade -y
sudo timedatectl set-timezone Asia/Karachi
```

Set timezone to your region. List zones:

```bash
timedatectl list-timezones
```

Create project directory:

```bash
sudo mkdir -p /var/www
sudo chown -R ubuntu:ubuntu /var/www
```

---

## 6. Enable Firewall

See [UFW Firewall guide](./UFW%20firewall%20ubuntu.md).

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## 7. Add Swap (Small Instances)

See [Swap file guide](./Swap%20file%20for%20small%20EC2.md) if using t2.micro.

---

## 8. Next Steps

Choose your deployment guide:

- [Laravel (Nginx)](./Deploy%20Laravel%20Project%20On%20Ubuntu%20(Aws).md)
- [Laravel (Apache)](./Deploy%20Laravel%20Project%20on%20ubuntu%20using%20Apache.md)
- [Next.js](./Deploy%20Next.js%20project%20on%20EC2.md)
- [Node.js](./Deploy%20Node%20project%20on%20ubuntu.md)
- [React](./Deploy%20React%20project%20on%20Ubuntu.md)

Then point your domain: [Route 53 / DNS](./Route%2053%20DNS%20setup.md)
