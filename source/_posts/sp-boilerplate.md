---
title: sp-boilerplate (super-project 模板项目)(废弃)
date: 2018-04-19 10:34:00
banner-color: 4644b1
tags:
    - 技术
    - koot.js
    - React
---

super-project 是 koot.js 的前身。

## 目录 /apps 说明

apps下承载一下子项目，每个子项目可能有自己的前端和后端。

 - api 接口服务模板
 - doc React同构模板 & 文档站点
 - www EJS网站模板
 - saas 第三方服务功能模板

## Debug

使用debug模块做控制台输出，类型：info|error|debug|log

## Log

之前的没有记载，从现在开始记录

 - 2017-11-16

    移除/apps/saas 项目，使用sp-service-wx \sp-service-* 代替，
    原因是用域名方式在服务器本机内请求效率没有程序内请求效率高。

- 2017-12-1

    修复了sp-css-import引用1个classname时，会多一个空格bug。