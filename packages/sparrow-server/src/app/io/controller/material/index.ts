import * as rp from 'request-promise-native';
const blockUrl = 'https://gitee.com/sparrow-js/vue-market/raw/master/blocks/block.json';

export default (app) => {
  return class MaterialController extends app.Controller {
    public async getBlocks (ctx) {
      const data = await request(blockUrl);
      const formatData = data.map((item) => {
        const {blockConfig, name, description} = item;
        return {
          key: blockConfig.name,
          title: blockConfig.title,
          description: description,
          img: blockConfig.screenshot,
          tags: blockConfig.blockConfig,
          originData: item,
        };
      });
      return {
        list: formatData,
      }
    }
  }
}

const request = async (uri: string, options = {}) => {
  options = Object.assign(
    {
      uri,
      json: true,
      rejectUnauthorized: false,
      headers: {
        'Cache-Control': 'no-cache',
      },
      timeout: 5000,
    },
    options
  );

  return await rp(options);
};