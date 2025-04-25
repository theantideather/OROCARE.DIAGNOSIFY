#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Echo with color
echo_color() {
  echo -e "${1}${2}${NC}"
}

# Check if git is installed
if ! command -v git &> /dev/null; then
  echo_color $RED "Git is not installed. Please install git first."
  exit 1
fi

# Check if the project is already a git repository
if [ ! -d .git ]; then
  echo_color $BLUE "Initializing git repository..."
  git init
else
  echo_color $GREEN "Git repository already initialized."
fi

# Set up repository remote
echo_color $BLUE "Setting up GitHub remote..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/theantideather/OROCARE.DIAGNOSIFY.git

# Add all files
echo_color $BLUE "Adding files to git..."
git add .

# Commit changes
echo_color $BLUE "Committing changes..."
git commit -m "Initial commit: OrocareAI Diagnosify app"

# Switch to main branch if not already on it
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo_color $BLUE "Switching to main branch..."
  git branch -M main
fi

# Push to GitHub
echo_color $BLUE "Pushing to GitHub..."
echo_color $GREEN "You will need to enter your GitHub credentials."
git push -u origin main

# Instructions for Netlify deployment
echo ""
echo_color $GREEN "===================================="
echo_color $GREEN "Repository has been pushed to GitHub!"
echo_color $GREEN "===================================="
echo ""
echo_color $BLUE "To deploy to Netlify:"
echo "1. Go to https://app.netlify.com/start"
echo "2. Select 'Deploy with GitHub'"
echo "3. Select the 'OROCARE.DIAGNOSIFY' repository"
echo "4. Configure your build settings:"
echo "   - Build command: npm run build"
echo "   - Publish directory: dist"
echo "5. Click 'Deploy site'"
echo ""
echo_color $BLUE "Set up environment variables in Netlify:"
echo "- Copy the values from your .env file"
echo "- Add them to the Netlify site environment variables"
echo ""
echo_color $GREEN "That's it! Your OrocareAI Diagnosify app is now live on Netlify." 