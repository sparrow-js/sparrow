import * as path from 'path';

const cwd = process.cwd();
const viewPath: string = path.join(cwd, '..', 'sparrow-view/src/views/index.vue');
const componentsDir = path.join(cwd, '..', 'sparrow-view/src/views/components')
const viewBasePath = path.join(cwd, '..', 'sparrow-view');
const templatePath = path.join(cwd, process.env.NODE_ENV === 'local' ? 'src/app/view/template' : 'dist/app/view/template');
const serverBusinessPath = path.join(cwd, process.env.NODE_ENV === 'local' ? 'src/app/view/template/business' : 'dist/app/view/template/business');
const pluginPath = path.join(cwd, '..', 'plugins');
const materielPath = path.join(cwd, process.env.NODE_ENV === 'local' ? 'src/lib/adapter-vue/modules' : 'dist/lib/adapter-vue/modules');
export default {
  viewPath,
  viewBasePath,
  componentsDir,
  templatePath,
  serverBusinessPath,
  pluginPath,
  materielPath
}