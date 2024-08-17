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
Write by GPT-4o：

| 工具           | 说明                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Docker         | 用于创建和管理容器的基础工具，允许开发者将应用程序及其依赖打包成轻量级的容器，实现环境一致性和快速部署。                                                           |
| Docker Compose | 用于定义和运行多容器Docker应用的工具，通过一个YAML文件配置应用的服务、网络和卷，简化了多容器应用的管理。                                                         |
| Docker Desktop | 提供了在Windows和macOS上运行Docker容器的本地开发环境，包括Docker引擎、Docker CLI、Kubernetes和Docker Compose。                                                   |
| Docker Hub     | Docker的公共镜像仓库，用户可以在此存储、分发和管理Docker镜像，也可以从社区共享的镜像中拉取需要的镜像。                                                            |




## 常用命令

```bash

# 查看正在运行的容器
docker ps 

# 镜像列表
docker images

# 删除镜像
docker rmi <image_id>

# 通过docker-compose启动容器
docker-compose up

# 重新构建并启动容器
docker-compose up --build  

```

## Dockerfile 模板

```bash

# 使用 Node.js 20 作为基础镜像
FROM node:20-alpine
# FROM node:20

# 创建并设置工作目录
WORKDIR /data/app

# 复制项目文件
COPY . .

# 安装项目依赖
RUN yarn
RUN yarn build

# 暴露端口，默认使用 3000，实际端口将通过 docker-compose.yml 或命令行传入
EXPOSE 3000

# 启动项目
CMD ["yarn", "start"]

```

## docker-compose.yml 模板

```yaml

services:
  app:
    container_name: my_container_name 
    image: my_image_name:${IMAGE_TAG:-latest}
    network_mode: bridge
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      # 4000是容器外部端口，3000是容器内部端口
      - "4000:3000"
    environment:
      - PORT=3000
      - NODE_ENV=production


```


## 场景：Mac 上构建 Docker 支持构建多平台镜像

在 Mac 上构建多平台镜像的时候会因缺少模拟器而报错，这时候需要安装 [tonistiigi/binfmt](https://hub.docker.com/r/tonistiigi/binfmt) 来支持多平台镜像构建。

```bash

# Step 1
# 安装 binfmt 支持多平台镜像构建
docker run --privileged --rm tonistiigi/binfmt --install all
# 或者只安装 arm64 和 amd64
docker run --privileged --rm tonistiigi/binfmt --install arm64,amd64

# Step 2
# 创建 buildx 构建器
docker buildx create --use --name my_builder --driver docker-container

# Step 3
# 检查和启动构建器
# 检查 builder 的配置，还会启动 BuildKit 容器（如果尚未启动）并确保 builder 准备好用于构建任务
# 查看当前 Driver 和 Platforms
# 需要确认 Driver 是 docker-container 不是 docker，Platforms 包含多个平台
docker buildx inspect --bootstrap

# Step 4
# 构建多平台镜像，--platform 参数指定要构建的平台，--load 参数表示构建完成后加载镜像（该情况只能支持一个 platform），--push 表示构建完成后推送镜像
# 构建并加载镜像
docker buildx build --platform linux/amd64 -t my_image_name:amd64 --load .
# 仅构建
docker buildx build --platform linux/arm64 -t my_image_name:arm64 .
# 构建并推送
docker buildx build --platform linux/amd64,linux/arm64 -t my_image_name:latest --push .

# Step 5
# 通过docker-compose运行镜像
docker-compose up -d

```


## 场景：手动部署镜像，Docker 镜像导出和导入
当不借助 Docker Hub 时，可以通过导出和导入镜像的方式来，把镜像打成压缩包，通过文件方式上传到服务器上。

```bash
# 导出镜像
docker save -o ./my_image_name.tar my_image_name:latest

# 导入镜像
docker load -i ./my_image_name.tar

```


## 场景：在 CentOS 上安装 Docker
在 CentOS 上安装 Docker 时通常会遇到 container-selinux 依赖问题，这时候手动下载 container-selinux 安装解决。

```bash

# Step 1
# 配置 Docker 安装源
curl -o /etc/yum.repos.d/docker-ce.repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# 查看版本，如果有版本，说明配置源正确
yum list docker-ce --showduplicates | sort -r

# Step 2
# 下载 container-selinux，到一个临时目录
# https://pkgs.org/download/container-selinux
# 找到对应的版本，点进详情页，在 Download 里选择 Binary Package 下载
# 例如：
wget https://mirror.stream.centos.org/9-stream/AppStream/x86_64/os/Packages/container-selinux-2.232.1-1.el9.noarch.rpm
# 下载后，安装
rpm -ivh container-selinux-2.232.1-1.el9.noarch.rpm

# Step 3
# 安装docker
yum install docker-ce

# Step 4
# 启动 docker
systemctl start docker
# 设置开启启动
systemctl enable docker
# 测试
docker run hello-world
# 查看运行实例，验证是否成功
docker ps

```