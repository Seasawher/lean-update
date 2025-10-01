import * as core from '@actions/core';

async function run() {
  try {
    core.info("Hello World");
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();