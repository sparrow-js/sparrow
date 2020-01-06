const path = require('path');
const fs = require('fs-extra');

const blocksDir = path.join(__dirname, '..');

const filterFolders = [
  'src',
  'node_modules',
  'public',
  '_script',
  'script'
];

const getBlockNames = async () => {
  const fileNames = await fs.readdir(blocksDir);

  const blockNames = fileNames.filter(fileName => {
    const filePath = path.join(blocksDir, fileName);
    return !filterFolders.includes(fileName) && fs.statSync(filePath).isDirectory();
  });
  return blockNames;
}

const getTemplate = (blockName) => {
  return `
    <template>
      <div class="home">
        <${blockName} />
      </div>
    </template>
    
    <script>
    import ${blockName} from '../../${blockName}/src';
    
    export default {
      name: "home",
      components: {
        ${blockName}
      }
    };
    </script>
  `;
}

module.exports ={
  getBlockNames,
  getTemplate
}