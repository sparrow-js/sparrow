import * as path from 'path';

export = {
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },

  io: {
    enable: true,
    package: 'egg-socket.io',
  },

  cors: {
    enable: true,
    package: 'egg-cors',
  },

  generator: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/generator')
  }

};
