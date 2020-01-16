import * as path from 'path';

const cwd = process.cwd();
const viewPath: string = path.join(cwd, '..', 'sparrow-view/src/views/index.vue');
const componentsDir = path.join(cwd, '..', 'sparrow-view/src/views/components')
const viewBasePath = path.join(cwd, '..', 'sparrow-view');

export default {
  viewPath,
  viewBasePath,
  componentsDir,
}