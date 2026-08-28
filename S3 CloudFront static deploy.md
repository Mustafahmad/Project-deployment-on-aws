# Deploy Static Site to S3 + CloudFront

Host a React/Vite/Next.js static export on AWS without a server (no PM2/Node at runtime).

Best for: `npm run build` output, Next.js `output: 'export'`, Create React App `build/`.

---

## 1. Build Locally

```bash
npm run build
```

Output folder is usually `dist/` (Vite) or `build/` (CRA) or `out/` (Next.js static export).

---

## 2. Create S3 Bucket

**S3 → Create bucket**

- Name: `yourdomain.com` (or unique name)
- Region: closest to users
- **Block all public access:** OFF (for static hosting) or use CloudFront OAC

Enable static website hosting (optional if using CloudFront only):

- Index document: `index.html`
- Error document: `index.html` (for SPA routing)

---

## 3. Upload Files

```bash
aws s3 sync ./dist s3://yourdomain.com --delete
```

Or upload via AWS Console.

---

## 4. Bucket Policy (Public Read)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::yourdomain.com/*"
    }
  ]
}
```

For production, prefer **CloudFront Origin Access Control** instead of public bucket.

---

## 5. CloudFront Distribution

**CloudFront → Create distribution**

| Setting | Value |
|---------|-------|
| Origin | S3 bucket |
| Viewer protocol | Redirect HTTP to HTTPS |
| Default root object | `index.html` |
| Alternate domain (CNAME) | `yourdomain.com`, `www.yourdomain.com` |

### SPA / React Router Error Pages

Add custom error response:

| HTTP error | Response page | Response code |
|------------|---------------|---------------|
| 403 | `/index.html` | 200 |
| 404 | `/index.html` | 200 |

This fixes client-side routing on refresh.

---

## 6. SSL Certificate (ACM)

**Certificate Manager → Request certificate** (must be in **us-east-1** for CloudFront):

- Domain: `yourdomain.com`, `www.yourdomain.com`
- Validation: DNS (add CNAME records Route 53 or registrar)

Attach certificate to CloudFront distribution.

---

## 7. DNS

Point domain to CloudFront distribution domain (e.g. `d111111abcdef8.cloudfront.net`):

| Type | Name | Value |
|------|------|-------|
| CNAME or Alias | @ / www | CloudFront domain |

In Route 53, use **Alias A record** to CloudFront.

---

## 8. Redeploy After Changes

```bash
npm run build
aws s3 sync ./dist s3://yourdomain.com --delete
aws cloudfront create-invalidation --distribution-id EXXXXXXXXX --paths "/*"
```

---

## When to Use This vs EC2

| S3 + CloudFront | EC2 + PM2/Nginx |
|-----------------|-----------------|
| Static files only | SSR, API, Node runtime |
| Cheaper at scale | Full server control |
| No SSH needed | Laravel, Next.js SSR |

For **Next.js SSR**, use [Next.js on EC2](./Deploy%20Next.js%20project%20on%20EC2.md) instead.
