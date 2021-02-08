// 因为是两个branch管理，所以需要处理
// 第一步，把最外层根目录的代码切换到 src 分支
// 第二步，把master分支clone到子文件夹public里，如下命令
// 第三步，可以执行yarn a 或者 yarn d
// git clone https://github.com/dongwenxiao/dongwenxiao.github.io.git public
// git checkout -b website origin/website （2021年尝试这步不需要了）

const workingDirPath = process.cwd() + "/public";
const simpleGit = require("simple-git")(workingDirPath);
simpleGit.add(".").commit("update website").push();
