#!/usr/bin/env node

const fs = require('fs');
const yargs = require('yargs/yargs')
const { execSync } = require('child_process')

const argv = yargs(process.argv.slice(2))
    .demandCommand(1)
    .option("p", { 
        alias: "plain", 
        describe: "Inits project without a package manager", 
        type: "boolean" 
    })
    // .option("y", { 
    //     alias: "yarn", 
    //     describe: "Inits project using yarn", 
    //     type: "boolean",
    //     conflicts: 'p'
    // })
    .option("g", { 
        alias: "no-git", 
        describe: "Inits project without git", 
        type: "boolean" 
    })
    .argv

// Name of the project
const name = argv._

try {
    fs.mkdirSync(`./${name}`);
    process.chdir(`./${name}`);

    const defaultHTML = 
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style.css">
    <title>${name}</title>
    <script src="${argv.p ? './index.js' : './src/index.js'}" defer></script>
</head>
<body>
    
</body>
</html>
`

    fs.writeFile(`./index.html`, defaultHTML, (err) => {
        if (err) return console.log('\x1b[33m', "There was an error creating the HTML file");
    });

    fs.writeFile(`./index.css`, '', (err) => {
        if (err) return console.log('\x1b[33m', "There was an error creating the HTML file");
    }); 

    if (!argv.p) fs.mkdirSync(`./src`);

    fs.writeFile(`./${argv.p ? '' : 'src/'}index.js`, '', (err) => {
        if (err) return console.log('\x1b[33m', "There was an error creating the JS file");
    });

    // Package manager. Defaults to npm
    // const pkgManager = argv.y ? 'yarn' : 'npm'

    execSync(`npm init -y`)

    if(!argv.g) {
        execSync(`git init`)
        fs.writeFile(`.gitignore`, '/node_modules', (err) => {
            if (err) return console.log('\x1b[33m', "There was an error creating the .gitignore");
        });
    }

    console.log(`\x1b[36mSuccess! \x1b[0mStarted a new project in \x1b[34m./${name}`)

} catch(err) {
    console.log('\x1b[31m' + `There was an error:`, '\x1b[0m' + err)
}