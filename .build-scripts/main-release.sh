#!/usr/bin/env bash
set -e

# No changes, skip release
readonly local last_release_commit_hash=$(git log --author="$GIT_USER" --pretty=format:"%H" -1)
echo "Last commit:    ${last_release_commit_hash} by $GIT_USER"
echo "Current commit: ${GITHUB_SHA}"
if [[ "${last_release_commit_hash}" = "${GITHUB_SHA}" ]]; then
     echo "No changes, skipping release"
     #exit 0
fi


# Config GIT
echo "Setup git user name to '$GIT_USER' and email to '$GIT_EMAIL'"
git config --global user.name "$GIT_USER";
git config --global user.email "$GIT_EMAIL";

# Checkout
git reset --hard
git fetch --all
git branch -a --contains ${GITHUB_SHA} --format="%(refname)"


readonly local refname=$(git branch -a --contains ${GITHUB_SHA} --format="%(refname)" | head -1)
if [[ "${refname}" = "refs/heads/main" ]]; then
     readonly local branch="main"
else
     readonly local branch=${refname#refs/remotes/origin/}
fi

# resolve versions
git checkout ${branch}
readonly local PROJECT_VERSION=$(node -e "console.log(require('./package.json').version);")
yarn version --patch
readonly local PROJECT_VERSION_NEXT=$(node -e "console.log(require('./package.json').version);")

# Log
echo "Git checkout refname: '${refname}' branch: '${branch}' commit: '${GITHUB_SHA}'"
echo "Project version: '${PROJECT_VERSION}' next: '${PROJECT_VERSION_NEXT}'"

# Tag and publish
yarn install
yarn build
yarn publish --new-version ${PROJECT_VERSION_NEXT}  --access public

git push origin ${branch}

git tag -a ${PROJECT_VERSION_NEXT} -m "release ${PROJECT_VERSION_NEXT}"
git push origin ${PROJECT_VERSION_NEXT}
