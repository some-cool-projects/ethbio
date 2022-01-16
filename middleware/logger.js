const chalk = require('chalk');

module.exports = function(req, res, next) {
   console.log(chalk.green('[LOG]'), chalk.blue(req.method), `Request From IP ${chalk.yellow(req.ip)}`, chalk.blue(req.originalUrl));

    next();
}