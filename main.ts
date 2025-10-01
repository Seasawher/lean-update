import * as core from '@actions/core';
import * as inputs from './mod/Inputs.ts';
import * as getLatest from './mod/GetLatestRelease.ts';

function run() {
  core.info("Hello World");
  core.info(`legacy_update: ${inputs.LEGACY_UPDATE}`);
  core.info(`directory: ${inputs.LAKE_PACKAGE_DIRECTORY}`);

  getLatest.run(true);
}

run();