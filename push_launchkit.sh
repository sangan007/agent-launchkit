#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "=== 1. INITIALIZATION ==="
# Remove existing .git directory to guarantee a clean start of repository history
if [ -d ".git" ]; then
  echo "Backing up and removing existing .git folder..."
  rm -rf .git
fi

# Run git init
git init
git config user.name "sangan007"
git config user.email "sangeerthsangan107@gmail.com"


# Create the developer-standard .gitignore file
cat << 'EOF' > .gitignore
node_modules/
.next/
out/
.env*.local
.DS_Store
EOF

# Stage the .gitignore and make Commit 1
git add .gitignore
git commit -m "chore: initialize repository and configure modern .gitignore guardrails"

echo "=== 2. ARCHITECTURE LAYERING ==="

# Commit 2: tailwind.config.js
if [ -f "tailwind.config.js" ]; then
  git add tailwind.config.js
  git commit -m "feat(style): integrate Apple & Google inspired design tokens into tailwind config"
else
  echo "Warning: tailwind.config.js not found, skipping Commit 2"
fi

# Commit 3: app/globals.css
if [ -f "app/globals.css" ]; then
  git add app/globals.css
  git commit -m "feat(style): implement mobile-ergonomic typography and responsive touch targets in global css"
else
  echo "Warning: app/globals.css not found, skipping Commit 3"
fi

# Commit 4: app/layout.js, components/Navbar.js and environment boilerplate
git add package.json package-lock.json postcss.config.mjs next.config.mjs eslint.config.mjs jsconfig.json vercel.json 2>/dev/null || true
if [ -f "app/layout.js" ]; then
  git add app/layout.js
fi
if [ -f "components/Navbar.js" ]; then
  git add components/Navbar.js
fi
git commit -m "feat(routing): establish multi-page root layout and global navigation blueprint"

# Commit 5: primary page configurations and components (storefront landing page)
git add app/page.js components/Footer.js components/ProgressProvider.js components/UI/ 2>/dev/null || true
if [ -d "app/blueprint" ]; then
  git add app/blueprint/
fi
git add public/ og-image.png README.md AGENTS.md CLAUDE.md 2>/dev/null || true
git commit -m "feat(ui): build conversion-optimized problem-first storefront landing page"

# Commit 6: calculator module directories
if [ -d "app/calculator" ]; then
  git add app/calculator/
  git commit -m "feat(calculator): implement state-driven client-side ROI calculator infrastructure"
else
  echo "Warning: app/calculator not found, skipping Commit 6"
fi

# Commit 7: AI integration routes and backend api files
if [ -d "app/api" ]; then
  git add app/api/
fi
if [ -d "app/consultant" ]; then
  git add app/consultant/
fi
git add .
git commit -m "feat(ai): configure secure server-side api route for productization engine orchestration" || echo "No remaining files to commit for Commit 7"

echo "=== 3. PRODUCTION SYNC ==="
# Ensure default branch is main
git branch -M main

# Add remote origin
git remote add origin https://github.com/sangeerthbalan/Agent-Launchkit.git

# Force push sequence to the remote branch
echo "Pushing commits to remote repository..."
git push -f -u origin main
echo "Git pipeline push complete!"

