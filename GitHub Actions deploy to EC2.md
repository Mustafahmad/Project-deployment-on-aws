# GitHub Actions — Deploy to EC2

Auto-deploy on push to `main`: SSH into EC2, pull latest code, build, and restart the app.

---

## 1. GitHub Secrets

In **Repository → Settings → Secrets and variables → Actions**, add:

| Secret | Value |
|--------|-------|
| `EC2_HOST` | EC2 public IP or domain |
| `EC2_USER` | `ubuntu` |
| `EC2_SSH_KEY` | Full contents of your `.pem` private key |

---

## 2. Laravel Deploy Workflow

Create `.github/workflows/deploy-laravel.yml`:

```yaml
name: Deploy Laravel to EC2

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            cd /var/www/html/your_project
            git pull origin main
            composer install --optimize-autoloader --no-dev
            php artisan migrate --force
            php artisan config:cache
            php artisan route:cache
            php artisan view:cache
            sudo supervisorctl restart laravel-worker:* || true
            sudo systemctl reload nginx
```

---

## 3. Next.js Deploy Workflow

Create `.github/workflows/deploy-nextjs.yml`:

```yaml
name: Deploy Next.js to EC2

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
            cd /var/www/your-next-app
            git pull origin main
            npm install
            npm run build
            pm2 restart next-app
```

---

## 4. Node.js Deploy Workflow

```yaml
name: Deploy Node to EC2

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
            cd /var/www/html/your-node-app
            git pull origin main
            npm install --production
            pm2 restart node-app
```

---

## 5. Server Prerequisites

On EC2, the project must already be cloned and initial setup done:

- Git remote configured (deploy key or HTTPS)
- PM2 / Supervisor / Nginx already running
- First deploy done manually

---

## 6. Optional: Deploy Only on Tags

```yaml
on:
  push:
    tags:
      - 'v*'
```

---

## Security Tips

- Restrict EC2 Security Group SSH to GitHub Actions IPs (advanced) or use a bastion
- Never commit `.pem` files to the repo
- Use a dedicated deploy user with limited permissions for production
- Run `npm audit` / `composer audit` in CI before deploy

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Permission denied (publickey) | Check `EC2_SSH_KEY` secret has full PEM including headers |
| npm/pm2 not found in CI script | Source NVM in script (see Next.js example) |
| git pull fails | Ensure deploy key is added on server for that repo |
| Build OOM on server | Add [swap](./Swap%20file%20for%20small%20EC2.md) or build in CI and rsync artifacts |
