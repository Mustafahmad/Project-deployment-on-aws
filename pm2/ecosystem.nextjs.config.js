// PM2 ecosystem config for Next.js
// Copy to your project root as ecosystem.config.js
// Usage: pm2 start ecosystem.config.js && pm2 save

module.exports = {
  apps: [
    {
      name: 'next-app',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/your-next-app',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
