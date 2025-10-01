import * as core from '@actions/core';

/** 最新の Lean リリースを取得する
 *
 * @paarm {Boolean} stable - trueならrcが付かない安定版リリースだけを取得する
 * @returns v4.23.0 または v4.22.0-rc2 のような形式の文字列
 */
function getLatestRelease (stable : boolean) : string {
  return "hello"
}

function run() {
  const legacy_update = core.getInput("legacy_update");
  const directory = core.getInput("lake_package_directory");
  core.info("Hello World");
  core.info(`legacy_update: ${legacy_update}`);
  core.info(`directory: ${directory}`);
}

run();