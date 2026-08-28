# Laravel `public/.htaccess` Notes

Laravel ships with a default `.htaccess` in the `public/` folder. Usually you leave it as-is. Use this guide when assets or routes break on shared hosting.

---

## Default Laravel `public/.htaccess`

This file should exist at `public/.htaccess`:

```apache
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

---

## When Root Rewrite Is Used

If you use [`laravel-root.htaccess`](./laravel-root.htaccess) at the project root, **keep** this `public/.htaccess` unchanged. Both work together:

1. Root `.htaccess` → sends request to `public/`
2. `public/.htaccess` → sends request to `index.php`

---

## Common Issues

### Assets return 404

- Confirm files exist in `public/build/` or `public/css/`
- Run `npm run build` locally and upload `public/build`
- Check `APP_URL` in `.env` matches your domain (with `https://`)

### Subfolder install (e.g. `example.com/app`)

Add to root `.htaccess` before other rules:

```apache
RewriteBase /app
```

And set in `.env`:

```env
APP_URL=https://example.com/app
```

### 500 Internal Server Error

- Ensure `mod_rewrite` is enabled (contact host support)
- Check PHP version is 8.1+
- Temporarily set `APP_DEBUG=true` to see the error, then set back to `false`

### Infinite redirect loop

- Remove duplicate rewrite rules if you copied rules into both root and `public/`
- Root should only redirect to `public/`; routing logic stays in `public/.htaccess`

---

## Do Not

- Put Laravel routing rules in the **root** `.htaccess` — only the redirect to `public/`
- Delete `public/.htaccess`
- Commit `.env` to Git
