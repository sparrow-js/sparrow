import * as path from 'path';
import * as fsExtra from 'fs-extra';
import * as util from 'util';
import * as rimraf from 'rimraf';
import * as execa from 'execa';

const rimrafAsync = util.promisify(rimraf);
import {IProject, ICreateDependencyParam, IContext } from '../../../../interface';

export const install = async (
  params: {
    dependencies: ICreateDependencyParam[];
    npmClient: string;
    registry: string;
    isDev: boolean;
    projectPath:string; 
  }
): Promise<void> => {
  const { dependencies, npmClient, registry, isDev, projectPath } = params;

  const args = ['install', '--loglevel', 'silly', '--no-package-lock', isDev ? '---save-dev' : '--save']
    .concat(dependencies.map(({ package: packageName, version }) => `${packageName}@${version}`))
    .concat(registry ? ['--registry', registry] : []);

  const childProcess = execa(
    npmClient,
    args,
    {
      cwd: projectPath,
      stdio: ['inherit', 'pipe', 'pipe'],
    }
  );

  const listenFunc = (buffer) => {
    const chunk = buffer.toString();
  };

  childProcess.stdout.on('data', listenFunc);

  childProcess.stderr.on('data', listenFunc);

  childProcess.on('error', (buffer) => {
    listenFunc(buffer);
  });

  childProcess.on('exit', (code) => {
  });
};
