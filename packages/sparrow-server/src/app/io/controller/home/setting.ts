import * as path from 'path';
import scanDirectory from '../../../../lib/scanDirectory';
import storage from '../../../../lib/storage';
import getArgs from '../../../../util/getArgs';

export default (app) => {
  const {Controller} = app;
  async function setWorkFolder(newWorkFolder: string, workFolderKey: string = 'workFolder') {
    const directories = await scanDirectory(newWorkFolder);
    storage.set(workFolderKey, newWorkFolder);
    return directories;
  }
  return class HomeController extends Controller {
    private workFolder = '/';

    private projectPath = getArgs('project');

    public async getWorkFolder() {
      let workFolder = '';
      if (this.projectPath) {
        workFolder = storage.get(`workFolder-${this.projectPath}`) || this.projectPath;
      } else {
        workFolder = storage.get('workFolder');
      }
      let directories = [];
      try {
        directories = await scanDirectory(workFolder);
      } catch (error) {}

      return {
        path: workFolder,
        directories,
      };
    }

    public async setWorkFolderBySub({ args }) {
      const { subDirectory } = args;
      let  workFolder = '';
      let newWorkFolder = '';
      let directories = [];
      let workFolderKey = 'workFolder';
      try {
        if (this.projectPath) {
          workFolder = storage.get(`workFolder-${this.projectPath}`) || this.projectPath;
          workFolderKey = `workFolder-${this.projectPath}`;
        } else {
          workFolder = storage.get('workFolder');
        }
        newWorkFolder = path.join(workFolder, subDirectory);
        directories = await setWorkFolder(newWorkFolder, workFolderKey);
      } catch (e) {
        newWorkFolder = '/';
        directories = await setWorkFolder(newWorkFolder, workFolderKey);
      }


      return {
        path: newWorkFolder,
        directories,
      };
    }

    public async setWorkFolder({ args }) {
      const { path } = args;
      let workFolderKey = 'workFolder';
      if (this.projectPath) {
        workFolderKey = `workFolder-${this.projectPath}`;
      }
      const directories = await setWorkFolder(path, workFolderKey);

      return {
        path,
        directories,
      };
    }

  }
}