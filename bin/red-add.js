const inquirer = require('inquirer') // 交互式命令行
const chalk = require('chalk') // 输出颜色改变
const fs = require('fs'); 
const tplObj = require(`${__dirname}/../template`) // 读取模板中数据


let question = [
    {
        name: 'name',
        type: 'input',
        message: '请输入模板名称',
        validate(val) {
            if (val === '') {
                return '请输入模板名称(必填)'
            } else if (tplObj[val]) {
                console.log('\n');
                console.log(val);
                console.log(tplObj[val]);
                console.log(typeof tplObj);
                console.log('\n');
                return '模板已经存在';
            } else {
                return true;
            }
        }
    },
    {
        name: 'url',
        type: 'input',
        validate(val) {
            if (val === '') {
                return '请输入模板的url'
            } 
            return true;
        }
    }
]

inquirer.prompt(question).then(ans =>{

    // 有两个参数
    let { name, url } = ans;

    // 过滤 url 中的 unicode 字符
    tplObj[name] = url.replace(/[\u0000]-[\u0019]/g, '')

    // 模板信息写入
    let fileUrl = `${ __dirname }/../template.json`
    let data = JSON.stringify(tplObj)

    fs.writeFile(fileUrl, data, 'utf-8', error=>{
        if (error) {
            console.log(error);
        }

        console.log('\n');
        console.log(chalk.green('模板添加成功'));
        console.log(chalk.red('最新的模板列表是'));
        console.log(tplObj);
        console.log('\n');
    })

})