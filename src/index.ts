import * as core from '@actions/core'
import * as github from '@actions/github'

function run() {
  const pattern = core.getInput('pattern');
  const regex = new RegExp(pattern);
  const title = github.context.payload?.pull_request?.title;

  core.info(title);

  if (!regex.test(title)) {
    core.setFailed(
      `Pull request title "${title}" does not match regex pattern "${pattern}".`,
    );
  }
}

run();
