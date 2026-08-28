# Route 53 & DNS Setup

Point your domain to an EC2 instance or any server IP.

---

## Option A: AWS Route 53

### 1. Create Hosted Zone

**Route 53 → Hosted zones → Create hosted zone**

- Domain: `yourdomain.com`
- Type: Public hosted zone

Note the **NS records** — update these at your domain registrar (GoDaddy, Namecheap, Hostinger, etc.).

### 2. A Record (Root Domain)

| Record name | Type | Value |
|-------------|------|-------|
| (blank) | A | Your EC2 Elastic IP |

### 3. CNAME (www)

| Record name | Type | Value |
|-------------|------|-------|
| www | CNAME | yourdomain.com |

Or use a second A record for `www` pointing to the same IP.

### 4. Subdomain (api, app)

| Record name | Type | Value |
|-------------|------|-------|
| api | A | Your EC2 Elastic IP |

---

## Option B: Cloudflare (Free)

1. Add site at [cloudflare.com](https://cloudflare.com)
2. Update nameservers at registrar
3. **DNS → Add record:**
   - Type: `A`, Name: `@`, Content: EC2 IP, Proxy: Proxied (orange cloud)
   - Type: `CNAME`, Name: `www`, Content: `yourdomain.com`

**SSL:** Cloudflare Flexible or Full (after Certbot on server).

---

## Option C: Hostinger / Registrar DNS

In domain DNS panel:

| Type | Host | Points to |
|------|------|-----------|
| A | @ | EC2 Elastic IP |
| A | www | EC2 Elastic IP |

TTL: 300–3600 seconds.

---

## Verify DNS Propagation

```bash
dig yourdomain.com +short
nslookup yourdomain.com
```

Or use [dnschecker.org](https://dnschecker.org).

Propagation can take 5 minutes to 48 hours.

---

## After DNS Works

1. Update Nginx/Apache `server_name` to your domain
2. Install SSL: [Nginx](./SSL%20certificate%20on%20nginx%20ubuntu.md) or [Apache](./SSL%20certificate%20on%20apache%20ubuntu.md)

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Domain shows old site | Clear DNS cache; wait for TTL |
| www works, root doesn't | Add A record for `@` |
| SSL fails | DNS must resolve to server before running Certbot |
| EC2 IP changed | Use Elastic IP or update A record |
