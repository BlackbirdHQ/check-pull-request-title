# Check Pull Request Title

A GitHub action that checks that a PR title matches a regex pattern.

Could be used for:

- Enforcing any commit convention.
- Enforcing including a Jira ticket reference in the title.
- Enforcing using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

The check will add a status check on the PR. If you want to enforce the title, this status check (called `Rule: Pull Request Title/verify-title`) should be used, and not the action itself.

# Example Workflow

```yml
name: 'Rule: Pull Request Title'
on:
  pull_request:
    types:
      # Check title when opened or synchronized.
      - opened
      - synchronize

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: BlackirdHQ/check-pull-request-title@release/v1
        with:
          # Match pull request titles in the form `fix(repo): Description'.
          pattern: '^(fix|refactor|enhancement|feature|documentation)\([^\)]+\): .+'
```
