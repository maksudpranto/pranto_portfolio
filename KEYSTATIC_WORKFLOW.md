# Keystatic Branching Workflow

This document outlines how to use the `stage` branch to reduce Vercel deployments when editing content via Keystatic.

## The Problem
Every time you save a change in Keystatic, it creates a Git commit. By default, Vercel triggers a full site rebuild for every commit on the `main` branch. This can lead to many unnecessary deployments.

## The Solution
Keystatic is now configured to push all content changes to the `stage` branch. This keeps your `main` branch clean and prevents immediate production deployments.

## How to Merge Content to Production

When you are ready to "Publish" your changes to the live site, follow these steps:

### Option A: Using the Command Line (Recommended)

Run these commands in your project folder:

```bash
# 1. Switch to main branch
git checkout main

# 2. Get the latest changes from GitHub
git pull origin main

# 3. Merge the content updates from stage
git merge stage

# 4. Push the merged changes to trigger the Vercel deployment
git push origin main

# 5. Switch back to stage for your next edits
git checkout stage
```

### Option B: Using GitHub Desktop or GitHub.com
1. Go to your repository on GitHub.
2. Click **"New Pull Request"**.
3. Set **base: `main`** and **compare: `stage`**.
4. Click **"Create Pull Request"** and then **"Merge Pull Request"**.

---

> [!TIP]
> This workflow allows you to batch your content updates. You can make dozens of changes in Keystatic and only trigger **one** final Vercel deployment when you merge to `main`.
