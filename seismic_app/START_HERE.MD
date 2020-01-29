## Steps to do after creating a new repo from this template


* replace repo name slug in links from readme.md and contributing.md

```
 sed -i 's/standard-repo-template/NEW_REPO_SLUG_HERE/g' README.MD
 sed -i 's/standard-repo-template/NEW_REPO_SLUG_HERE/g' ./.github/CONTRIBUTING.MD
```

* put repo name in the title from readme.md and contributing.md

```
 sed -i 's/Project name/NEW_PROJECT_NAME_HERE/g' README.MD
 sed -i 's/Code for Romania standard project/NEW_PROJECT_NAME_HERE -/g' ./.github/CONTRIBUTING.MD
```

* update appropriate styleguide link in contributing.md under *Best practices - Coding best practices*

* go to settings and check the Sponsorships (Sponsorships help your community know how to financially support this repository.) checkbox :wink:

* delete this file :smile:
