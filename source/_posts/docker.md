---
title: 🐳 Docker
date: 2024-8-15
tag:
  - 技术
  - Docker
category: 类别一
---

记录 Docker 常用的内容。

## Docker 几个常用工具


| 工具           | 说明                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Docker         | 用于创建和管理容器的基础工具，允许开发者将应用程序及其依赖打包成轻量级的容器，实现环境一致性和快速部署。                                                           |
| Docker Compose | 用于定义和运行多容器Docker应用的工具，通过一个YAML文件配置应用的服务、网络和卷，简化了多容器应用的管理。                                                         |
| Docker Desktop | 提供了在Windows和macOS上运行Docker容器的本地开发环境，包括Docker引擎、Docker CLI、Kubernetes和Docker Compose。                                                   |
| Docker Hub     | Docker的公共镜像仓库，用户可以在此存储、分发和管理Docker镜像，也可以从社区共享的镜像中拉取需要的镜像。                                                            |

> Write by GPT-4o


## 常用命令

```bash

# 查看正在运行的容器
docker ps 

# 镜像处理
docker images
docker rmi <image_id>

# 重新构建镜像
docker-compose build --no-cache 

# 重新构建并启动容器
docker-compose up --build  

# 导出/导入镜像
docker save -o /Users/dongwenxiao/Documents/test/docker-test/my-img.tar my-custom-koa-app-test
docker load -i ./my-img.tar

```

## Dockerfile 模板

```bash
# 使用 Node.js 20 作为基础镜像
FROM node:20

# 创建并设置工作目录
WORKDIR /data/app

# 复制 package.json 和 package-lock.json 文件
COPY package.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件
COPY . .

# 暴露端口，默认使用 3000，实际端口将通过 docker-compose.yml 或命令行传入
EXPOSE 3000

# 启动命令，默认使用 3000 端口
CMD ["npm", "start"]
```

## Docker Compose 模板

```yaml
version: "3.8"

services:
  app:
    container_name: test-container 
    image: my-custom-koa-app-test:latest
    network_mode: bridge
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "4000:3000"
    environment:
      - PORT=3000
    working_dir: /data/app
    command: npm start
```