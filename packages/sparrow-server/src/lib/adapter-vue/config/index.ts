import * as path from 'path';

const cwd = process.cwd();
const viewPath: string = path.join(cwd, '..', 'sparrow-view/src/views/index.vue');
const componentsDir = path.join(cwd, '..', 'sparrow-view/src/views/components')
const viewBasePath = path.join(cwd, '..', 'sparrow-view');
const templatePath = path.join(cwd, process.env.NODE_ENV === 'local' ? 'src/app/view/template' : 'dist/app/view/template');
export default {
  viewPath,
  viewBasePath,
  componentsDir,
  templatePath
}