#!/usr/bin/env node
const chalk = require('chalk');
const program = require('commander');
const packageConfig = require('../package');
const projectPath = process.cwd()

program.version(packageConfig.version).usage('<command> [options]');

program.arguments('<command>').action((cmd) => {

  program.outputHelp();
  console.log(chalk.red(`Unknown command ${chalk.yellow(cmd)}`));
  console.log();
});

program
  .command('start')
  .description('start and open the sparrow')
  .option('-m, --mode [mode]')
  .option('-i, --init [init]')
  .option('-f, --forbidupdate [forbidupdate]')
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ sparrow start');
  })
  .action(async (cmd) => {
    try {
      // eslint-disable-next-line global-require
      await require('../command/start')({
        mode: cmd.mode,
        init: cmd.init,
        forbidupdate: cmd.forbidupdate,
        projectPath,
      });
    }  catch (err) {
      log.error('iceworks start error', err.message);
      console.error(err.stack);
      process.exit(1);
    }
  });

program.on('--help', () => {
  console.log();
  console.log(
    `  Run ${chalk.cyan('sparrow <command> --help')} for detailed usage of given command.`
  );
  console.log();
});

program.commands.forEach((c) => c.on('--help', () => console.log()));

program.parse(process.argv);


(async () => {

  if (!process.argv.slice(2).length) {
    try {
      await require('../command/start')({
        mode: false,
        forbidupdate: false
      });
    } catch (err) {
      console.error(err.stack)
    }
  }
  
})();
