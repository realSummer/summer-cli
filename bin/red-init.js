
const inquirer = require('inquirer') // 交互式命令行
const chalk = require('chalk') // 命令行颜色
const tplObj = require(`${__dirname}/../template`)

const program = require('commander')
const ora = require('ora')

const download = require('download-git-repo')

program.parse(process.argv)

let templateName = ''
let projectName = ''

let question = [
    {
      name: "projectName",
      type: "input",
      message: "请输入项目名称",
      validate(val) {
        if (val === "") return "项目名称必填";
        return true;
      }
    }
  ];
  
  const promptList = [
    {
      type: "list",
      message: "请选择一个模板:",
      name: "templateName",
      choices: Object.keys(tplObj),
      validate(val) {
        if (val === "") {
          return "请先创建模板";
        }
      }
    }
  ];

  console.log(program.args);

  // 当没有输入参数的时候给个提示
if (program.args.length < 1) {
    inquirer
      .prompt(promptList)
      .then(answers => {
        templateName = answers.templateName;
      })
      .then(() => {
        inquirer.prompt(question).then(answers => {
          projectName = answers.projectName;
          startProject();
        });
      });
  } else {

    templateName = program.args[0];
    projectName = program.args[1];

    // 参数校验
    if (!tplObj[templateName]) {
      console.log(chalk.red("\n Template does not exit! \n "));
      return;
    }
    if (!projectName) {
      console.log(chalk.red("\n The projectName is required! \n "));
      return;
    }
    startProject();
  }

  function startProject() {
    let url = tplObj[templateName]

    console.log('开始下载模板');

    // 加载图标
    const spinner = ora('Downloading...')
    spinner.start()

    // 开始下载
    console.log('\n 下载中 \n ');

    // 结束加载图标
    spinner.succeed();

    console.log(chalk.green('下载完成'));

    // download(url, projectName, err => {

    //     if (err) {
    //       spinner.fail();
    //       console.log(chalk.red(` 模板生成失败 ${err}`));
    //       return;
    //     }

    //     // 结束加载图标
    //     spinner.succeed();

    //     console.log(chalk.green('下载完成'));

    //     console.log("\n To get started");

    //     console.log(`\n    cd ${projectName} \n`);
    //     process.exit();
    //   });


  }

