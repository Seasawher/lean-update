import { execSync } from 'node:child_process';
import * as core from '@actions/core';
import * as semvar from "semver-ts";

/** ネットワークから最新のLeanリリースを取得する
 *
 * @param {Boolean} stable - trueならrcが付かない安定版リリースだけを取得する
 * @returns {string} v4.23.0 または v4.22.0-rc2 のような形式の文字列
 */
export function run (stable : boolean) : string {
  // leanprover/lean4 からすべてのリリースタグを取得する
  core.info('Fetching release tags from leanprover/lean4...');

  const releasesJson = execSync('gh release list --repo leanprover/lean4 --json tagName', { encoding: 'utf8' });
  const releaseObjects : { tagName: string }[] = JSON.parse(releasesJson);
  const releases : string[] = releaseObjects
    .map(obj => obj.tagName)
    .filter(tag => tag.startsWith('v'));

  let semvers = releases.map(tag => semvar.parse(tag));
  if (stable) {
    semvers = semvers.filter(v => v && v.prerelease.length === 0);
  }
  console.log(semvers);

  return "hello"
}