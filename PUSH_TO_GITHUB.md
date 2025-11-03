# Push to GitHub - Instructions

## Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `LifeChangingJourneyApp` (or your preferred name)
3. Choose Public or Private
4. DO NOT initialize with README, .gitignore, or license
5. Click "Create repository"

## Step 2: Add Remote and Push

After creating the repository, GitHub will show you commands. Use these:

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/LifeChangingJourneyApp.git
git branch -M main
git push -u origin main
```

Or if you prefer SSH (if you have SSH keys set up):
```bash
git remote add origin git@github.com:YOUR_USERNAME/LifeChangingJourneyApp.git
git branch -M main
git push -u origin main
```

## Step 3: If you already have changes to commit

```bash
git add .
git commit -m "Update service detail screen scrolling fix"
git push origin main
```

