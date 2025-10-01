import * as core from '@actions/core';

/** 最新の Lean リリースを取得する
 *
 * @paarm {Boolean} stable - trueならrcが付かない安定版リリースだけを取得する
 * @returns v4.23.0 または v4.22.0-rc2 のような形式の文字列
 */
function getLatestRelease (stable : boolean) : string {
  return "hello"
}

const LEGACY_UPDATE = Deno.env.get("LEGACY_UPDATE") ?? "";
const LAKE_PACKAGE_DIRECTORY = Deno.env.get("LAKE_PACKAGE_DIRECTORY") ?? "";

function run() {
  core.info("Hello World");
  core.info(`legacy_update: ${LEGACY_UPDATE}`);
  core.info(`directory: ${LAKE_PACKAGE_DIRECTORY}`);
}

run();