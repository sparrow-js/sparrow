const cwd = process.cwd();
const viewPath = cwd.split('sparrow-ui')[0] + 'sparrow-view'
export default {
  id: viewPath,
  command: 'vue-cli-service serve --port 9000',
  path: viewPath
}