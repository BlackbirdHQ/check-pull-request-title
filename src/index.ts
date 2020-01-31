import * as core from '@actions/core'
import * as github from '@actions/github'

async function run() {
  const pattern = core.getInput('pattern');
  const token = core.getInput('token');
  const regex = new RegExp(pattern);
  const octokit = new github.GitHub(token);
  const owner = github.context.repo.owner;
  const repo = github.context.repo.repo;

  const { data: pullRequest } = await octokit.pulls.get({
    owner,
    repo,
    pull_number: github.context.payload?.pull_request?.number!,
  });

  const title = pullRequest.title;
  const sha = pullRequest.head.sha;

  core.info(title);

  if (!regex.test(title)) {
    try {
      await octokit.repos.createStatus({
        owner,
        repo,
        sha,
        context: 'Rule: Pull Request Title/verify-title',
        state: 'failure',
        description: "The title should look something like 'fix(ui-app): Handle undefined values when listing lines'"
      });
    } catch(err) {
      console.error("Failed to set status check on PR");
    }
    core.setFailed(
      `Pull request title "${title}" does not match regex pattern "${pattern}".`,
    );
  } else {
    try {
      await octokit.repos.createStatus({
        owner,
        repo,
        sha,
        context: 'Rule: Pull Request Title/verify-title',
        state: 'success',
        description: 'Title looks fine'
      });
    } catch(err) {
      console.error("Failed to set status check on PR");
    }
  }
}

run();
