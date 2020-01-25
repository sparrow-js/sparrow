#!/usr/bin/env node
(async () => {

  if (!process.argv.slice(2).length) {
    try {
      await require('../command/start')({});
    } catch (err) {
      console.error(err.stack)
    }
  }
  
})();