## 启动
- `npm install` 安装对应的依赖包
- `npm run dev` 启动开发环境
- `npm run build` 打包成生产
- `npm run test` 或 `npm run test -- --coverage` 执行单元测试用例

# 项目技术栈
vue2 + typescript + elementui + router + axios + scss 等

 ## 包依赖简介
### 生成环境包

```javascript
"dependencies": {
    "@babel/polyfill": "^7.12.1",  // 兼容ie10 的关键包，需要在main.ts的第一行导入哦
    "axios": "^0.21.1", // 获取网络请求
    "core-js": "^3.6.5",  // 核心js库
    "js-cookie": "^2.2.1", // 使用cookie 进行存储数据
    "normalize.css": "^8.0.1", // css 对项目的基本样式初始化
    "path-to-regexp": "^6.2.0",  // 将路径字符串（如/ user /：name）转换为正则表达式，匹配路由
    "style-resources-loader": "^1.4.1", // 对样式资源的加载器
    "vue": "^2.6.11", // 不介绍
    "vue-class-component": "^7.2.3", // vue 类组件库 必备
    "vue-property-decorator": "^9.1.2", // vue 类的装饰器
    "vue-router": "^3.2.0", // router
    "vue-svgicon": "^3.2.9", // 使用的图标
    "vuex": "^3.4.0", // 存储数据的vuex
    "vuex-module-decorators": "^1.0.1" // vuex 的类型检查
  },
```
### 开发环境包
不解释，基本上都是一些自带的包，然后安装一些预编译的包。eslint , ts, @types等

# 开发注意
## 图标
图标直接去阿里里面复制到对应的svg图标到，src -> icons->svg 即可，然后使用命令 npm run svg(这里已经配置好了对应的脚本启动) 会自动的全局导入图标


## router
 所有的路由都如果需要在菜单的右侧中显示，必须要要配置在layout组件的`children`中.
 如：（详细请查看源码）
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210310125655718.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNDk5Nzgy,size_16,color_FFFFFF,t_70)
## 颜色变量
默认全局导入了两个变量文件，一个是`variable.scss`, 另一个是 `mixin.scss`, 需要啥颜色直接改里面的`$mianColor` 和 `subColor`， 包括可以定义elementui的主题颜色
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210310125831826.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNDk5Nzgy,size_16,color_FFFFFF,t_70)
## 表单验证
封装了一个表单验证器，可以直接在`to-form-item ` 中的rule 导入对应的规则，即可，如：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210310130045604.png)
# 菜单权限控制
因为没有后台支持，权限控制直接在`matchRouteMenu ` 路由守卫进行匹配和存入数据 即可
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210310130138102.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxNDk5Nzgy,size_16,color_FFFFFF,t_70)
# 最后：
基础的架子已经搭建好，只适合一些需要兼容ie项目的vue应用。毕竟vue3 不兼容ie


---

## 全局切换iconfont库

全局变量：

1. `mixin_currentIconfont`: 当前已生效的iconfont库;

2. `mixin_getCurrentIconfont("param1 = 'shezhi'", "param2='icon'")`：
    
    param1（设置icon样式class）；

    param2（前缀自定义class）