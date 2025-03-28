# Vercel Deployment Guide for EduAI App

This guide will walk you through deploying the EduAI educational app to Vercel. The app is built with Next.js and includes integration with DeepSeek AI.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup) (you can sign up with GitHub, GitLab, or email)
2. [Git](https://git-scm.com/downloads) installed on your computer
3. [Node.js](https://nodejs.org/) (version 14 or later) installed on your computer

## Step 1: Download the Project Files

First, download the project files from this package. The package contains all the necessary files for the EduAI app.

## Step 2: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click on the "+" icon in the top right corner and select "New repository"
3. Name your repository (e.g., "eduai-app")
4. Choose "Public" or "Private" visibility
5. Click "Create repository"

## Step 3: Push the Project to GitHub

Open a terminal or command prompt and run the following commands:

```bash
# Navigate to the project directory
cd path/to/eduai-app

# Initialize a Git repository
git init

# Add all files to the repository
git add .

# Commit the files
git commit -m "Initial commit"

# Add your GitHub repository as a remote
git remote add origin https://github.com/yourusername/eduai-app.git

# Push the files to GitHub
git push -u origin main
```

Replace `yourusername` with your GitHub username and `eduai-app` with your repository name.

## Step 4: Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "Add New" and select "Project"
3. Import your GitHub repository
4. Configure your project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: .next
5. Environment Variables (optional):
   - If you have a DeepSeek AI API key, add it as `DEEPSEEK_API_KEY`
6. Click "Deploy"

Vercel will automatically build and deploy your application. Once the deployment is complete, you'll receive a URL where your app is hosted (e.g., `https://eduai-app.vercel.app`).

## Step 5: Test Your Deployed Application

1. Visit the URL provided by Vercel
2. You should see the onboarding page of the EduAI app
3. Go through the onboarding process
4. Test the chat functionality with the DeepSeek AI integration

## Updating Your Application

Whenever you want to make changes to your application:

1. Make the changes to your local files
2. Commit the changes to Git:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. Vercel will automatically detect the changes and redeploy your application

## Troubleshooting

If you encounter any issues during deployment:

1. Check the Vercel deployment logs for error messages
2. Ensure all dependencies are correctly listed in package.json
3. Verify that your environment variables are correctly set
4. Make sure your DeepSeek AI API key is valid (if using a real API key)

## Getting a DeepSeek AI API Key

To use the real DeepSeek AI API instead of the simulation:

1. Visit the [DeepSeek AI website](https://www.deepseek.com/)
2. Sign up for an account and request an API key
3. Add the API key to your Vercel project as an environment variable named `DEEPSEEK_API_KEY`
4. Update the DeepseekClient.js file to use the real API instead of the simulation

## Need Help?

If you need assistance with your deployment, you can:

1. Check the [Vercel documentation](https://vercel.com/docs)
2. Visit the [Next.js documentation](https://nextjs.org/docs)
3. Contact the DeepSeek AI support team for API-related questions
