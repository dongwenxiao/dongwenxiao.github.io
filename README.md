## Start

**Step 1**

Clone 仓库到文件夹 `dongwenxiao.github.io/`，进入克隆的目录，然后切换到分支`src`。

```shell
git clone git@github.com:dongwenxiao/dongwenxiao.github.io.git

cd ./dongwenxiao.github.io/

git checkout -b src origin/src
```

**Step 2**

在`./dongwenxiao.github.io/`下创建`public`文件夹，用于存放生成的静态网页。

克隆 `master` 分支到 `/public` 文件夹

```
git clone git@github.com:dongwenxiao/dongwenxiao.github.io.git public
```

**Step 3**

每次更新完文章，执行 `package.json` 的 `auto` 命令，自动执行：清理 public → 生成新文章 html → 自动部署到 github

```
yarn auto
```
