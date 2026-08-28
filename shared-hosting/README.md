# Shared Hosting — Laravel `.htaccess`

Use these configs on **Hostinger**, cPanel, or any Apache shared host where you **cannot** set the document root to Laravel's `public/` folder.

---

## Folder Structure on Hostinger

Upload your full Laravel project. The host usually serves from `public_html/`:

```
public_html/
├── app/
├── bootstrap/
├── config/
├── public/          ← Laravel's web root (index.php lives here)
│   ├── index.php
│   └── .htaccess    ← Laravel's default public/.htaccess (keep it)
├── resources/
├── routes/
├── storage/
├── vendor/
├── .env
└── .htaccess        ← Copy laravel-root.htaccess here (see below)
```

---

## Setup Steps

1. Upload or clone your Laravel project into `public_html/` (or your domain folder).

2. Copy `laravel-root.htaccess` from this repo into the **project root** and rename it to `.htaccess`:

   ```bash
   cp laravel-root.htaccess .htaccess
   ```

3. Keep the existing `.htaccess` inside `public/` — do not remove it.

4. Set permissions on `storage/` and `bootstrap/cache/` (via File Manager or SSH if available):

   ```bash
   chmod -R 775 storage bootstrap/cache
   ```

5. Point your `.env` to the host's MySQL credentials (from Hostinger panel).

---

## What It Does

The root `.htaccess` rewrites all incoming URLs to the `public/` directory so requests hit `public/index.php` correctly — same behavior as pointing Nginx/Apache `DocumentRoot` at `public/` on a VPS.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 500 Internal Server Error | Enable `mod_rewrite` in host panel, or contact support |
| Assets/CSS not loading | Confirm `APP_URL` in `.env` matches your domain |
| Still shows directory listing | Add `Options -Indexes` to root `.htaccess` |
| Works locally, fails on host | Check PHP version in Hostinger panel (Laravel 10+ needs PHP 8.1+) |

---

## File Reference

| File | Place at |
|------|----------|
| [`laravel-root.htaccess`](./laravel-root.htaccess) | Project root → rename to `.htaccess` |
| `public/.htaccess` | Already in Laravel — leave as-is |
