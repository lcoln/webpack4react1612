# front-end-project-react

> react项目框架

## Build Setup

``` bash

# 安装依赖
npm install

# 本地调试
npm run dev commonLibs projectName

# 推送测试机
npm run build:server:(dev/prod) commonLibs projectName
&&
npm run push:server

# 推送测试环境
npm run build:dev commonLibs projectName
&&
npm run push:cdn:dev

# 推送正式环境
npm run build:prod commonLibs projectName
&&
npm run push:cdn:prod
```
## Js/Tslint
```
1. variable name must be in lowerCamelCase, PascalCase or UPPER_CASE // 小驼峰命名、大驼峰式命名法、大写
2. "indent": [true, "space", 2] // 2空格缩进
3. no-conditional-assignment // 不允许在if条件中写 "="
4. components must be named in uppercase // eg: import Head from './components/header'
5. file/folder must be named in lowercase or connet with "-" // eg: home、data-analysis
6. block not allow empty // 作用域不允许空
```
## cdn/webpack
```
1. ./cdnConfig为存放测试服务器与cdn配置文件目录
2. ./projects/projectName/config为存放webpack配置与环境变量目录，可参考exam项目
```