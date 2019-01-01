# vue-chat

### 介绍

这是基于vue的校园交友网站,也是信息系统课程的作业

### 技术栈：

前端vue，vue-router,vuex ，vue-cli和axios，scss,用rem做了移动端适配，没有用第三方组件。
后端用koa2，用gulp构建工具实现自动刷新后端代码运行。
数据库用mysql，基于Token的jwt鉴权机制，用socket.io做双向通信；


### 项目展示


### 下载到本地开发环境跑

```js
npm i
```
```js
npm run dev
```
```js
cd server
```
```js
npm i
```
接着下面两条命令执行一条就行，看着选；（如果想要修改后端代码即时保存刷新，用第一条；如果像想用chrome进行debug调试，用第二条)

```js
npm run start  
```
```js
npm run dev
```
##### 如果对您有帮助，希望给个start，鼓励我继续更新^ ^

### 开发目录

```
├── LICENSE
├── README.md
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── logo.png
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── dist  //打包后的静态资源
│   ├── index.html
│   └── static
├── index.html
├── package-lock.json
├── package.json
├── server  // 后端代码
│   ├── config.js
│   ├── controllers
│   ├── gulpfile.js
│   ├── index.js
│   ├── init  //数据库初始化(sql文件也在这)
│   ├── middlewares
│   ├── models
│   ├── package-lock.json
│   ├── package.json
│   ├── routes
│   └── utils
├── src  //前端代码
│   ├── App.vue
│   ├── assets
│   ├── components
│   ├── main.js
│   ├── pages
│   ├── router
│   ├── store //vuex在这
│   └── utils
└── static
```

#### 第三方文档

[socket.io英文文档](https://socket.io/docs/server-api/)

[socket.io中文文档](https://zhuanlan.zhihu.com/p/29148869)

[socket.io  in github](https://github.com/socketio/socket.io/)

[socket.io-client in github](https://github.com/socketio/socket.io-client)

[聊天机器人api](http://www.tuling123.com/)

###  License

[MIT](http://opensource.org/licenses/MIT)
