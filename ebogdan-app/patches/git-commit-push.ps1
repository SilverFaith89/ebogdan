# Commit and push changes to develop branch
# Run this from the project root (C:\Users\Lenovo\ebogdan-git\ebogdan-app) where git is available.
# This script will add changed files, commit with the provided message and Co-authored-by trailer, and push to origin/develop.

param(
    [string]$branch = 'develop'
)

# Ensure git is available
$gitPath = (Get-Command git -ErrorAction SilentlyContinue)
if (-not $gitPath) {
    Write-Error "git is not found in PATH. Install Git or run this script in an environment where git is available."
    exit 1
}

# Ensure we're in the repository
$repoRoot = (git rev-parse --show-toplevel 2>$null)
if (-not $repoRoot) {
    Write-Error "Current directory is not inside a git repository."
    exit 1
}

# Switch to the target branch (create if needed)
$currBranch = git rev-parse --abbrev-ref HEAD
if ($currBranch -ne $branch) {
    git fetch origin
    $exists = git ls-remote --heads origin $branch
    if ($exists) {
        git checkout $branch
        git pull origin $branch
    } else {
        git checkout -b $branch
    }
}

# Stage, commit, push
git add -A
$commitMsg = "Remove SSG plugin and fix build; regenerate dist

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

# If there's nothing to commit, skip
if (-not (git status --porcelain)) {
    Write-Output "No changes to commit."
} else {
    git commit -m $commitMsg
    git push origin $branch
    Write-Output "Changes pushed to origin/$branch"
}
