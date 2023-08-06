const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs');
const tplObj = require(`${__dirname}/../template`)

console.log(tplObj);

let question = [
    {
        name: 'name',
        message: '请输入要删除的模板的名称',
        validate(val) {
            if (val === '') {
                return '请输入要删除的模板的名称'
            } else if (!tplObj[val]) {
                console.log('\n');
                console.log(val);
                console.log(tplObj[val]);
                console.log(typeof tplObj);
                console.log('\n');
                return '模板不存在';
            } else {
                return true;
            }
        }
    }
]

inquirer.prompt(question).then(ans => {
    let { name } = asn;
    delete tplObj[name];
    let fileUrl = `${ __dirname }/../template.json`
    let data = JSON.stringify(tplObj)

    fs.writeFile(fileUrl, data, 'utf-8', error=>{
        if (error) {
            console.log(error);
        }

        console.log('\n');
        console.log(chalk.green('删除成功'));
        console.log(chalk.red('最新的模板列表是'));
        console.log(tplObj);
        console.log('\n');
    })
    
})