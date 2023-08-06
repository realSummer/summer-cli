
const program = require('commander')

// 定义当前版本
// 定义使用方法
// 定义四个指令

// let version = require('../package'.version)
// console.log(version);

program
    .version(require('../../package'.version))
    .usage('<commadn> [options]')
    .command('add', '添加模板')
    .command('delete', '删除模板')
    .command('list', '模板列表')
    .command('init', '初始化一个新模板')

// 解析命令行输入的内容
// 解析命令行参数
program.parse(process.argv)