// git clone https://github.com/dongwenxiao/dongwenxiao.github.io.git public
// git checkout -b website origin/website


const workingDirPath = process.cwd() + '/public'
const simpleGit = require('simple-git')(workingDirPath)
simpleGit
    .add('.')
    .commit('update website')
    .push()
