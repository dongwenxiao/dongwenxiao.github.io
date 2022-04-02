---
title: 2017年的WEB前端开发 - 单页面终于嫁给了多页面
date: 2017-08-03
banner-color: 447fb1
tags:
  - 技术
  - koot.js
  - React
---

## 引言

WEB 前端技术早已今非昔比，可谓是`大前端`。从网页上的炫酷效果，到页面的布局，再到服务端模板渲染和数据接口功能，WEB 前端技术都可以轻松搞定。甚至利用 JavaScript 可以编写很多跨界的项目，如游戏开发（[Cocos2d](http://www.cocos.com/)\\[Unity3D](https://unity3d.com/cn/)）、机器学习（[ConvNetJS](http://cs.stanford.edu/people/karpathy/convnetjs/)）、跨平台应用（[ReactNative](https://facebook.github.io/react-native/)）等等。

如今[jQuery](http://jquery.com/)已成是一个优秀的古老的存在，前端技术日新月异，如果你是前端开发者，不知道：[React](https://facebook.github.io/react/)、[Vue](http://vuejs.org/)、[Angular](https://angularjs.org/)、[Webpack](https://webpack.js.org/)、[Gulp](https://gulpjs.com/)、[Sass](http://sass-lang.com/)、[LESS](http://lesscss.org/)、[PostCSS](http://postcss.org/)、[NodeJS](http://nodejs.cn/)、[Koa](http://koajs.com/)、[Express](http://expressjs.com/)、[Mocha](http://mochajs.org/)、[Yarn](https://yarnpkg.com/)、[Redux](http://redux.js.org/)、[Middleware]()、ES6/7、[TS](http://www.typescriptlang.org/)、[Coffee](http://coffee-script.org/)、[Babel](http://babeljs.cn/)等等这些词，那你真该好好学习一番了（说的不全，就这个意思吧）。

就本文而言，单说说网站开发这块的事儿，看看 2017 年的 WEB 技术能做到什么程度。

## 技术的初衷就是解决问题

问题的存在与技术的存在不像“先有鸡还是先有蛋”的问题那么纠结，这必然是先有问题，再有对应的技术解决此问题的。而问题的产生往往是因为我们追逐着完美，想要更优秀。在网站开发这个领域同样如此，网页是人机交互的入口，我们追求的正是响应的速度、展现的效果和使用的体验。

## 那么问题就来了（先只抛砖，后面有讲解）

### 一、如何让网页响应的速度更快呢？

`现有情况`

**1.传统的多页面（服务端渲染 HTML）方式**

把公共部分的 JS/CSS 引用到页面里，首次加载会下载额外的资源文件。
切换页面重定向的时候，整体页面刷新，很多资源被 2 次下载，并且有一段时间页面空白。

问题：下载了额外的资源文件，页面重定向会有空白间断。

**2.单页面 WEB 应用（SPA）方式**

把页面的基础 HTML 壳子和页面所需要的 JS/CSS 是先下载到浏览器端，再进行 HTML 渲染，整个网页必须在引用的 JS 文件下载后，n 毫秒后显示。（即使做了 AMD 方式的分包，可以优化节省下载时间，但无法根本解决页面展现  依赖 JS 下载完成问题）

问题：网页的整体显示依赖于 JS 是文件下载时间。

`理想情况`

根据当前 URL 请求，返回对应的（完整内容）HTML 和（当前页面所需要的）CSS 以及（基础功能和当前业务）JS。
其中 CSS 放到页内，与 HTML 一同下载，会省了 1 条下载线程让给其他资源。（与传统方式不同  的是 CSS 没有多余的部分）
其中 JS 放到最后加载，不影响网页首屏的显示。
后续的所有页面（与本站相关的网页）都是跟进用户的动作按需加载，做异步的 JS 处理。
后续加载的 JS 不会重复下载。

总结：在首次打开页面时候排除所有可能排除的下载内容，让网页瘦成一道闪电。

### 二、假如上面的理想情况实现了，后续的内容全部是 JS 加载渲染，那么 SEO 该怎么办？

`现有情况`

**1.传统的多页面（服务端渲染 HTML）方式**

有较好的 SEO 能力，可以在 HTML 渲染时候指定多处 SEO 优化内容。

**2.单页面 WEB 应用（SPA）方式**

几乎丧失了多页面网站的 SEO 能力，也会有一些特定的方法解决，但效果跟多页面网站完全不是一个 level 的。

`理想情况`

我还没有更好的办法超越“多页面网站”的 SEO 能力，那就做到和它一样的 level。
要做到 2 点：

a) URL 必须返回对应的 HTML 内容
b) 前端开发的时候可以轻松设置 SEO 内容（如 meta、title 等）

### 三、假如上面的理想情况实现了，那么作为一家国际化的公司多语言是个必不可少的功能，该如何实现呢？

`中小型项目`

一般会编写国际化的语言变量文件，根据浏览器的设置或者用户的选择，调用不同的语言变量文件。目录结构如下：

```
    --i18n
        |
        +---zh.js
        |
        +---en.js
```

`大型项目`

与中小型项目不同的是，大型项目有较多的语言变量，如果一次性加载导致速度慢，而且很多当时用不到的地方会产生流量的浪费。
这时候我们会做拆分，根据功能分支，做按需加载。目录结构如下：

```
    --i18n
        |
        +---feature-1
        |   |
        |   +---zh.js
        |   |
        |   +---en.js
        |
        |
        +---feature-2
            |
            +---zh.js
            |
            +---en.js
```

另外，还一种方式跟据语言包种类，用 Webpack 根据语音种类，打出多套程序代码进行部署，比如要支持 3 个语言，那么就生成 3 套部署代码，线上跑 3 个网站程序。这种方式是性能最好的。

### 四、假如上面的多语言也实现了，公司做 Android 平台的项目那么多，我们前端同学能做什么呢？

`PWA` [点击了解](https://developers.google.com/web/progressive-web-apps/)

PWA 是 Google 推出的渐进式 Web 应用程序，让 H5 在 Android 平台上增加了很多类似 APP 的功能，如推送、像应用一样放到桌面、离线使用等。

那么前端同学就可以利用 Google 的 API 来加强 H5 的体验。在实现的时候只是多了一些配置代码和对数据请求的特殊处理。
离线的核心技术就是 ServiceWorker。从开发工作量的角度来说，并不会有太多的额外工作量，
自己可以基于 NodeJS 来实现一套工具自动完成这件事儿。

`AMP` [点击了解](https://www.ampproject.org/learn/overview/)

AMP 也是 Google 推出的增强网页体验和增强搜索能力的方案。有点类似小程序，
严格要求安装他的语法格式编写网页。不一样的是他自带一个 JS 库，可以直接在浏览器上运行。

前端同学可以利用 AMP 的语法做出让用户更高效浏览的网站，特别适用于新闻类型的站点，Google 搜索会对 AMP 实现的网站有专项推荐。
从开发工作量的角度来说，会增加一些工作量，实现需要用到 AMP 特定的语法规范。

### 五、假如上面的多语言也实现了，那么我们的开发效率能不能更高？

说到这里，就不做比较了，前端攻城狮们或可以说“心灵手巧”，或可以说“懒到极致”，
近几年是不断的：发明工具->重新发明工具->重新发明工具->重新...

工具会减少重复劳动的好东西，必不可少，这里我会从多个角度分析，如何提高前端开发效率。

`跨职能联调`

**1.与服务端开发同学联调**

你是否工作中常听见：“他的接口还没好，等接口呢”、“页面写好了，就差套模板了”、“服务端同学又改我代码”、“等服务端同学帮我搭建环境”...

这些问题可以通过与服务端同学的配合方式上解决，前后端开发完全分离，让服务端同学只开发接口，更专注于数据业务逻辑和接口性能。让前端开发开发网站的非数据库部分，包括了服务端渲染和网页页面。前端同学用 NodeJS 技术做服务端开发，代码部署到与服务端代码相同的机房，这样既不会影响网站速度，又不会导致前后端开发互相影响。仅基于接口的联调会更容易测试、排除问题。（阿里早几年就已经开始这样做了）

**2.与测试同学的配合**

基于上述的开发模式，接口可以加上单元测试，避免一些低级错误的发生。
前端同学自己的写的逻辑性代码也可以加上“单元测试”（有精力的情况下），
包括页面的交互上操作也可以加上“行为测试”（有精力的情况下）。
这样在交 QA 同学的时候就会减少很多低级错误了。

`团队开发有规范`

1. 统一用 ES、TS、Coffee 等这些比较先进的语法
2. CSS 使用 LESS\Sass 等
3. 统一编码风格，一个.eslintrc 配置文件（ESLint）就可以搞定
4. 组件化开发：React\Vue\...
5. 适当的加上 git hook，做 code review

等等这些内容现在的前端开发比较常用，不细说了。

`善用工具`

1. WEB 前端的工具应该是最丰富的了，代码检查、合并、压缩、混淆、SourceMap、CSS 优化、各种任务预处理工具：前天的 Grunt\昨天的 Gulp\今天的 Webpack
2. 开发的时候还有实时更新的工具，边写边更新页面：LiveReload、Webpack-dev-server、HMR
3. 图片资源的（视觉）无损压缩处理：Tinypng
4. 各种测试工具：Mocha\Karma\Jasmine
5. NodeJS 进程管理工具：PM2
6. 不得不提的包管理工具：NPM(CNPM)\Yarn

### 总结：

1. 减少沟通成本，其实大多程序猿的 coding 速度还很快的。
2. 规范和工具都是围绕着 “Don't repeat yourself!” 这个思路来执行的。

## 把理想变成现实

上述的种种已实现并整理成框架，名为“super-project”，模板项目：[sp-boilerplate](https://github.com/websage-team/sp-boilerplate)
框架核心：[super-project](https://github.com/websage-team/super-project)
引用技术：Koa+React+Redux+Webpack（可以使用类似的技术替换，如：Express+Vue+Vuex+Browserify）

下面简要简介了一些技术点实现原理，涉及内容较多，不能面面俱到，想深入了解的同学请点击链接查看源码，一探究竟，或直接找我沟通。

### 一、如何让网页响应的速度更快呢？让网页瘦成一道闪电

1. 准备好一份精简的 HTML 框架(跟进业务精简，酌情处理)。

2. 利用 React+React-Router 服务端渲染的能力（自研发 Koa 服务端渲染 React 功能中间件[super-project/ReactApp](https://github.com/websage-team/super-project/tree/master/src/ReactApp)），在服务端执行 React 代码，渲染出当 URL 请求对应的 HTML 片段。

3. 用样式收集器（自研发[sp-css-import](https://github.com/websage-team/sp-css-import)），收集到当前 HTML 片段里（React 组件）需要的 CSS。
   样式收集器原理，利用组件化开发的方式，把每个组件对应的 CSS 独立出来，用于引用收集，利用 React 渲染机制，在用户访问页面时，把用到的组件的 CSS 注入到收集器中，收集器在分类、压缩 CSS。在网页内运行期间，页面内部组件会根据用户的操作发生改变，组件使用次数会有全局的监听，根据页面内使用到的组件动态调整页内`<Style />`标签的内容，标签内容实时对应了当前组件的 CSS 需求。参考下面图示：
   ![](/assets/css-counter-note.png)

4. 利用 Webpack 的打包（AMD、require.ensure）能力，把 JS 根据页面拆分，产出 1 个入口文件和 N 个页面相关的 JS 文件，这样入口文件会根据当前的 URL 判断加载哪些页面逻辑相关的 JS 文件。

5. 最后把收集好的 CSS 插入到 HTML 框架头部，把 React 渲染好的 HTML 插入到内容体，把入口 JS 文件链接放到页尾，返回给浏览器。

```
        +------------------------------------------------+
        |   HTML 精简结构                                 |
        |                                                |
        |       +--------------------------------+       |
        |       |       CSS (页内 CSS <style>)    |       |
        |       +--------------------------------+       |
        |       |       React-HTML               |       |
        |       +--------------------------------+       |
        |       |      JS Link (只有 JS 入口文件)  |       |
        |       +--------------------------------+       |
        |                                                |
        +------------------------------------------------+
```

### 二、那么 SEO 该怎么办？让网页首次打开带有完整的 HTML 代码

1. 主体内容的完整性在上一个问题解决的同时（步骤 2）也被解决了。

2. 自定义的 meta 其实是与 react 逻辑脱离的，写前端业务的同学不容易接触到 NodeJS 相关代码。我的解决方案是在 React 组件上扩展了 onServerRender 的事件，当服务端运行 React 逻辑的时候，会自动检测该事件并执行，在 onServerRender 事件里暴露自定义 meta 的相关方法，从而为前端开发者开放了编写 meta 的能力。onServerRender 事件里还暴露了一些自定义 HTML 的方法，以便扩展 HTML 内容。

注：网上流行的说法是把 React Server Render 叫成“同构”，为了让大家更容易理解这种方式，我画了一个访问流程图示例：

![](/assets/isomorphic-flow.png)

说明：

1. 多页面站点浏览方式
   用户直接访问目标页面，页面 A 与页面 B 直接是跳转 URL 的方式（整体刷新）。

2. 单页面站点浏览方式
   不管用户访问的是哪个 URL，都返回相同的框架页内容（无内容），在浏览器端用 JS 判断跳转显示目标页面，后续的页面跳转，都是 JS 做的，无需刷新页面。

3. 同构站点浏览方式
   用户直接访问目标页面，每个目标页面都可以作为框架页（类似单页面的框架页），在后续的页面跳转，都是用 JS 做的，无需刷新页面。

### 三、上面是思路，可根据具体情况选择方案。

### 四、PWA 和 AMP

1. PWA 我们已经针对当前的项目架构做出了自动化工具，可查看源码 [sp-pwa](https://github.com/websage-team/sp-pwa)
2. AMP 目前没法自动化，只能根据业务做开发。

### 五、开发工具和 Webpack 配置在模板项目里已存在，感兴趣的请仔细查看、尝试

https://github.com/websage-team/super-project

## 小试牛刀

super-project 已经应用到两个项目上了，点击下面链接，亲手体验一下“单页面嫁给多页面”（同构）的 feel~
（时间就了也许会因为业务停止而打不开）

`PhotoGrid Share H5`

[例子 - 详情页面](http://photogrid.cmcm.com/posts/rnR8C9Xg78MNHDU5TrXOOQ%3D%3D?f=profile-GW3Y75kQ%2BkFshbCpnXV7WEj5b02%2BSC8n%2FgFxM6Sx72E%3D)
[例子 - 列表页面](http://photogrid.cmcm.com/profile/OOUqewXJPwKn2qg%2BRFGgo1qoC2UfoTvLlifSZd6%2BOfM%3D)

`News Republic Site`

[例子 - 首页](https://news.cmcm.com/)
[例子 - 详情页面](https://news.cmcm.com/detail/03EAFABEFA10100001_us)

## 结语

综上所述，是我个人经验的整理和融合，让网站即有 SPA 的体验又不失 SEO 的能力（单页面嫁给了多页面）。发掘所有能提高用户体验的方式，将优化进行到底。后续我和团队还会继续优化 super-project 框架，下一个解决的问题就是升级框架的成本变低，使用框架的成本变低，是针对业务开发者使用上的体验优化。

欢迎感兴趣的朋友随时探讨。
