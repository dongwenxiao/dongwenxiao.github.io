---
title: UmiJS Study 1
# date: 2022-04-02 23:17:51
date: 2021-12-02 23:17:51
tags: 
    - Umi
    - React
banner-height:
banner-color: 1890ff
---

## 背景 

为什么要写这个系列文章？
对于第一次上手 UmiJS 还是有点卡壳，时不时的会因为官网文档介绍不全而多次尝试。
所以，把我的学习思路分享出来。

## 重点内容

利用 `UmiJS` 脚手架工具创建项目并运行起来。

## 快速开始

### 环境准备

环境准备部分可以直接参考[官方文档](https://umijs.org/zh-CN/docs/getting-started)的，简单的说就是安装好新版本的NodeJS。

我习惯用[Yarn](https://yarn.bootcss.com/)，推荐的原因是相比`npm`安装出差的概率更小。

如果没有VPN翻墙，建议更换`yarn`淘宝源：
```shell
# shell
$ yarn config set registry https://registry.npm.taobao.org/
```

### 创建项目

使用官方的脚手架创建项目工程

```
# 先创建一个存放项目的目录
$ cd /test/
$ mkdir umijs-test
$ cd umijs-test

# 在目录里执行脚手架命令
$ yarn create @umijs/umi-app
```

执行脚手架命令后它会有这些动作：下载脚手架 → 创建初始化文件 → 完成。

然后我来安装依赖：
（我的安装过程大概15秒左右，根据网速每个人不同）
```
# 在项目根目录执行
$ yarn
```


### 启动项目

启动项目执行 `package.json` 里的 `start` 命令：

```shell
$ yarn start
```

这里的 `yarn start` 其实是调用 `umi dev`，它是 `umijs` 自己写的命令执行文件，存放在 `./node_modules/.bin/umi`。

此时我们可以看见控制台里开始有英文输出、进度条跳动等等噼里啪啦的闪动，这其实是[webpack](https://webpack.js.org/) 启动了开发模式的服务并且开始执行第一次打包 `js` 工作。

很快，控制台静止了，会看见下面👇 关键信息，意思是同构下面的两个地址都可以访问到本地开发环境的项目预览。

```
App running at:
  - Local:   http://localhost:8000 (copied to clipboard)
  - Network: http://192.168.31.213:8000
```

我用的是 MacBook + [VS Code](https://code.visualstudio.com/)，可以直接按键 "command" + 点击链接 就可以打开网页了，也可以通过复制 `http://localhost:8000` 到浏览器里，自行打开。

此时看见的就是 `UmiJS` 项目了。