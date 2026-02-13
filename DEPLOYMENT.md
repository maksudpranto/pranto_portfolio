# Portfolio Deployment Guide (Next.js + Keystatic)

This guide outlines the steps to deploy your portfolio on Vercel with Keystatic CMS integrated using GitHub storage.

## Step 1: GitHub App Setup
Keystatic requires a GitHub App to manage content in production.

1.  **Create App**: Go to **Settings > Developer settings > GitHub Apps > New GitHub App**.
2.  **Homepage URL**: `https://your-site.vercel.app` (e.g., `https://pranto-portfolio-sandy.vercel.app`)
3.  **Callback URL**: `https://your-site.vercel.app/api/keystatic/github/oauth/callback`
4.  **Webhook**: Uncheck the **Active** box.
5.  **Repository Permissions**:
    *   **Contents**: `Read & write`
    *   **Pull requests**: `Read & write`
    *   **Metadata**: `Read-only` (default)
6.  **Installation**: Install the app on your repository (**Install App** sidebar menu).
7.  **Secrets**: Generate a **Client Secret** and note down the **Client ID**.

## Step 2: Vercel Environment Variables
Add these variables in your Vercel Dashboard (**Settings > Environment Variables**):

| Variable Name | Description |
| :--- | :--- |
| `KEYSTATIC_GITHUB_CLIENT_ID` | Your GitHub App Client ID |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | Your GitHub App Client Secret |
| `KEYSTATIC_SECRET` | **At least 32 characters long** random string |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER` | `maksudpranto` |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_NAME` | `pranto_portfolio` |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | Your GitHub App's slug |

## Step 3: Deployment
1.  Push your code to GitHub.
2.  Import the repo into Vercel.
3.  Deploy.

## Troubleshooting: HTTP 500 / redirect_uri Error
*   **500 Error**: Usually caused by `KEYSTATIC_SECRET` being shorter than 32 characters.
*   **Redirect Error**: Ensure the **Callback URL** in GitHub exactly matches the domain you are visiting, and and contains `/oauth/callback`.
*   **Static Build Failure**: Ensure the Keystatic route (`/api/keystatic/[[...conf]]/route.ts`) has `export const dynamic = 'force-dynamic';`.
