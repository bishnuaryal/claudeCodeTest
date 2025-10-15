# Contributing Guide

## Git Workflow

This project follows a branch-based workflow to ensure code quality and enable collaboration.

### Workflow Steps

#### 1. Create a Feature Branch

Always create a new branch for your changes:

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

**Branch naming conventions:**
- `feature/` - New features (e.g., `feature/add-pagination`)
- `fix/` - Bug fixes (e.g., `fix/validation-error`)
- `refactor/` - Code refactoring (e.g., `refactor/simplify-routes`)
- `docs/` - Documentation updates (e.g., `docs/update-readme`)
- `test/` - Adding tests (e.g., `test/add-unit-tests`)

#### 2. Make Your Changes

Work on your feature branch:

```bash
# Make changes to files
# Run tests and linting
npm run lint:fix
npm run format

# Stage and commit your changes
git add .
git commit -m "feat: add user authentication

- Implement JWT-based authentication
- Add login and logout endpoints
- Update API documentation"
```

**Commit message format:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

#### 3. Push Your Branch

```bash
# Push your branch to GitHub
git push -u origin feature/your-feature-name
```

#### 4. Create a Pull Request

```bash
# Using GitHub CLI
gh pr create --title "Add user authentication" --body "## Summary
- Implemented JWT-based authentication
- Added login/logout endpoints
- Updated documentation

## Test Plan
- [ ] Run npm test
- [ ] Test login endpoint
- [ ] Test logout endpoint
- [ ] Verify JWT token validation"

# Or create PR on GitHub website
# https://github.com/bishnuaryal/claudeCodeTest/compare
```

#### 5. Code Review & Merge

- Wait for code review
- Address any feedback
- Once approved, merge the PR
- Delete the feature branch

```bash
# After PR is merged, update your local main branch
git checkout main
git pull origin main

# Delete the feature branch locally
git branch -d feature/your-feature-name
```

### Protecting the Main Branch

To prevent accidental direct pushes to main, configure branch protection:

**On GitHub:**
1. Go to Settings → Branches
2. Add rule for `main` branch
3. Enable:
   - ✅ Require pull request before merging
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date

**Locally:**
You can also add a pre-push hook to warn against pushing to main:

```bash
# Create .git/hooks/pre-push
cat > .git/hooks/pre-push << 'EOF'
#!/bin/sh
current_branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')

if [ "$current_branch" = "main" ]; then
    echo "⚠️  WARNING: You are trying to push to the main branch!"
    echo "Please create a feature branch instead:"
    echo "  git checkout -b feature/your-feature-name"
    echo ""
    read -p "Are you sure you want to push to main? (y/N): " confirm
    if [ "$confirm" != "y" ]; then
        echo "Push cancelled."
        exit 1
    fi
fi
EOF

chmod +x .git/hooks/pre-push
```

### Quick Reference

```bash
# Start new work
git checkout main
git pull origin main
git checkout -b feature/my-feature

# Make changes, commit, push
git add .
git commit -m "feat: description"
git push -u origin feature/my-feature

# Create PR
gh pr create

# After merge, cleanup
git checkout main
git pull origin main
git branch -d feature/my-feature
```

## Code Quality Checks

Before pushing, always run:

```bash
npm run lint        # Check for errors
npm run lint:fix    # Auto-fix issues
npm run format      # Format code
npm test            # Run tests (when available)
```

## Common Issues

### Issue: Forgot to create a branch

```bash
# If you've made changes on main but haven't committed
git checkout -b feature/my-feature
# Your changes move to the new branch
```

### Issue: Already committed to main locally

```bash
# Create a new branch with your commits
git branch feature/my-feature

# Reset main to match origin
git checkout main
git reset --hard origin/main

# Switch to feature branch
git checkout feature/my-feature
git push -u origin feature/my-feature
```

### Issue: Merge conflicts

```bash
# Update your branch with latest main
git checkout feature/my-feature
git fetch origin
git merge origin/main

# Resolve conflicts in your editor
# Then commit the merge
git add .
git commit -m "merge: resolve conflicts with main"
git push
```

## Benefits of This Workflow

1. **Code Review** - Team members review changes before merging
2. **CI/CD** - Automated tests run on every PR
3. **Clean History** - Easy to track features and fixes
4. **Safe Experimentation** - Work doesn't affect main until ready
5. **Easy Rollback** - Can revert entire features if needed
6. **Collaboration** - Multiple people can work simultaneously

## Example Workflow

```bash
# Day 1: Start new feature
git checkout -b feature/add-pagination
# ... make changes ...
git commit -m "feat: add pagination to todos endpoint"
git push -u origin feature/add-pagination
gh pr create

# Day 2: Address review comments
# ... make changes ...
git commit -m "fix: adjust page size validation"
git push

# Day 3: PR approved and merged
git checkout main
git pull origin main
git branch -d feature/add-pagination
```

Remember: **Never push directly to main!** Always use feature branches and pull requests.
