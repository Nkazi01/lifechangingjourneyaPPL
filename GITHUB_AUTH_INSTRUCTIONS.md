# GitHub Authentication Fix

## The Issue
Your Git is configured with username `innovativedesigner773` but the repository belongs to `Nkazi01`.

## Solution Options:

### Option 1: Use Personal Access Token (Recommended)

1. **Generate a Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Name: `LifeChangingJourneyApp`
   - Expiration: Choose your preference (90 days, 1 year, or no expiration)
   - Select scopes: Check `repo` (this gives full repository access)
   - Click "Generate token"
   - **COPY THE TOKEN** (you won't see it again!)

2. **Clear old credentials:**
   - Open Windows Credential Manager (search for it in Windows)
   - Go to "Windows Credentials"
   - Find any entries for `github.com`
   - Delete them

3. **Push again:**
   ```bash
   git push -u origin main
   ```
   - When prompted for username: Enter `Nkazi01`
   - When prompted for password: Paste your Personal Access Token (NOT your GitHub password)

### Option 2: Use SSH (Alternative)

1. **Generate SSH key** (if you don't have one):
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. **Add SSH key to GitHub:**
   - Copy your public key: `cat ~/.ssh/id_ed25519.pub`
   - Go to: https://github.com/settings/keys
   - Click "New SSH key"
   - Paste your key and save

3. **Update remote to use SSH:**
   ```bash
   git remote set-url origin git@github.com:Nkazi01/lifechangingjourneyaPPL.git
   git push -u origin main
   ```

### Quick Fix: Update Remote URL with Token

You can also embed the token in the URL (less secure but quick):
```bash
git remote set-url origin https://YOUR_TOKEN@github.com/Nkazi01/lifechangingjourneyaPPL.git
git push -u origin main
```

Replace `YOUR_TOKEN` with your Personal Access Token.

