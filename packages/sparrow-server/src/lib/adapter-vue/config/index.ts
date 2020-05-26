import * as path from 'path';

const cwd = process.cwd();
const viewPath: string = path.join(cwd, '..', 'sparrow-view/src/views/index.vue');
const componentsDir = path.join(cwd, '..', 'sparrow-view/src/views/components')
const viewBasePath = path.join(cwd, '..', 'sparrow-view');
const templatePath = path.join(cwd, process.env.NODE_ENV === 'local' ? 'src/app/view/template' : 'dist/app/view/template');
const serverBusinessPath = path.join(cwd, 'src/app/view/template/business');

export default {
  viewPath,
  viewBasePath,
  componentsDir,
  templatePath,
  serverBusinessPath
}