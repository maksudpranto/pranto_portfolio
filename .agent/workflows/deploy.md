---
description: How to deploy the application from GitHub to Vercel
---

### 🚀 Simplified Deployment Flow

Follow these steps to ensure your changes are live on Vercel:

1. **Commit and Push to GitHub**
   Ensure all your local changes are pushed to the `main` branch:
   ```powershell
   git add .
   git commit -m "feat: your descriptive message"
   git push origin main
   ```

2. **Wait for Automatic Build**
   Vercel is configured to watch your `main` branch. As soon as you push, it will start a new build automatically.

3. **Monitor the Build**
   - Go to your [Vercel Dashboard](https://vercel.com/dashboard).
   - Click on your project **pranto_portfolio**.
   - Check the **Deployments** tab to see the progress.

4. **Troubleshooting**
   - If the build fails, check the **Build Logs** in Vercel.
   - Common issues include missing `"use client"` in new pages or missing Environment Variables.

// turbo
5. **Direct CLI Deployment (Manual)**
   If you want to bypass GitHub and deploy directly from your terminal:
   ```powershell
   vercel --prod
   ```
