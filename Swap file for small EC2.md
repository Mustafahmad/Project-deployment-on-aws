# Add Swap on Small EC2 Instances

Small instances (t2.micro, t3.micro) often run out of RAM during `npm run build`, `composer install`, or Next.js builds. Adding swap prevents OOM kills.

---

## 1. Check Current Memory & Swap

```bash
free -h
```

---

## 2. Create 2GB Swap File

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

Verify:

```bash
free -h
```

---

## 3. Make Swap Permanent

```bash
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

## 4. Tune Swappiness (Optional)

Lower value = use RAM first, swap only when needed:

```bash
sudo sysctl vm.swappiness=10
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
```

---

## 5. Remove Swap (If Needed)

```bash
sudo swapoff /swapfile
sudo rm /swapfile
sudo sed -i '/\/swapfile/d' /etc/fstab
```

---

## When You Need This

- `Killed` during npm/composer build
- Server freezes under load on 1GB RAM instances
- Next.js or Laravel build fails with no clear error

After adding swap, retry your build command.
