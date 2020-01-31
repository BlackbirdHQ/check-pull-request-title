import * as core from '@actions/core'
import * as github from '@actions/github'

async function run() {
  const pattern = core.getInput('pattern');
  const token = core.getInput('token');

  const regex = new RegExp(pattern);

  const octokit = new github.GitHub(token);

  const { data: pullRequest } = await octokit.pulls.get({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    pull_number: github.context.payload?.pull_request?.number!,
  });

  const title = pullRequest.title;

  core.info(title);

  if (!regex.test(title)) {
    core.setFailed(
      `Pull request title "${title}" does not match regex pattern "${pattern}".`,
    );
  }
}

run();
