import * as path from 'path';
import scanDirectory from '../../../../lib/scanDirectory';
import storage from '../../../../lib/storage';

export default (app) => {
  const {Controller} = app;
  async function setWorkFolder(newWorkFolder: string) {
    const directories = await scanDirectory(newWorkFolder);
    storage.set('workFolder', newWorkFolder);
    return directories;
  }
  return class HomeController extends Controller {
    private workFolder = '/';

    public async getWorkFolder() {
      const workFolder = storage.get('workFolder');
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
      try {
        workFolder = storage.get('workFolder');
        newWorkFolder = path.join(workFolder, subDirectory);
        directories = await setWorkFolder(newWorkFolder);
      } catch (e) {
        newWorkFolder = '/';
        directories = await setWorkFolder(newWorkFolder);
      }


      return {
        path: newWorkFolder,
        directories,
      };
    }

    public async setWorkFolder({ args }) {
      const { path } = args;

      const directories = await setWorkFolder(path);

      return {
        path,
        directories,
      };
    }

  }
}