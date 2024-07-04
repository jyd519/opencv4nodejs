import fs from 'fs';
import path from 'path';
import type * as openCV from '../../typings/index.js';
import { getDirName, getRequire } from './meta.js';

declare type OpenCVType = typeof openCV;

const logDebug = process.env.OPENCV4NODES_DEBUG_REQUIRE ? console.log : () => { /* ignore */ }

export function getOpenCV(opt?: any): OpenCVType {
  let opencvBuild: OpenCVType | null = null;
  let requirePath = '';
  if ((process as any)["resourcesPath"]) {
    requirePath = path.join((process as any).resourcesPath , "opencv4.node");
  }

  if (!fs.existsSync(requirePath)) {
    const dirname = getDirName();
    const build = process.arch === "x64" ? "build64" : "build";
    requirePath = path.join(dirname, `../../${build}/Debug/opencv4.node`);
    if (!fs.existsSync(requirePath)) {
      requirePath = path.join(dirname, `../../${build}/Release/opencv4.node`);
    }
    requirePath = requirePath.replace(/\.node$/, '');
  }

  try {
      logDebug('require', `require path is ${requirePath}`);
      opencvBuild = getRequire()(requirePath);
  } catch (err) {
    // err.code === 'ERR_DLOPEN_FAILED'
    logDebug('require', `failed to require cv with exception: ${(err as Error).toString()}`)
    logDebug('require', 'attempting to add opencv binaries to path')

    if (!process.env.path) {
      logDebug('require', 'there is no path environment variable, skipping...')
      throw err
    }

    logDebug('require', 'process.env.path: ' + process.env.path)
    try {
        opencvBuild = getRequire()(requirePath);
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      }
      throw e;
    }
  }
  if (!opencvBuild)
    throw new Error('Failed to require opencv4nodejs.node');
  return opencvBuild;
}

export default getOpenCV;
