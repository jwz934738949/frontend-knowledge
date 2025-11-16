# CSS
## CSS预处理器
### sass
#### 1. npm安装
```bash
  pnpm add sass -D
```
#### 2. 基础语法
##### 2.1. 注释
- 对sass语法进行注释使用/**/ 或者 //
- /**/ 推荐使用，编译后仍然保留注释内容
- // 编译后不保留内容
- 当编译后压缩css文件时，统一删除注释内容
- /*! */ 加入!后的注释可以在压缩后显示，!代表版权信息
```
  样例 ./sass-demo/src/注释.scss
```
##### 2.2. 变量  
- 使用$进行变量定义，同时定义的变量存在作用域，局域变量无法用于全局
- !global关键字用于提升作用域，将局部变量设置为全局
```
  样例 ./sass-demo/src/变量.scss
```
##### 2.3. 数据类型
- 2.3.1. 数值类型
  - 正负数，浮点数，以及数字加单位
- 2.3.2. 字符类型
  - 单引号，双引号的字符串，或者不加引号的字符串
- 2.3.3. 布尔类型
  - true, false, 以及相关逻辑运算，使用and、or、not或者运算结果
- 2.3.4. 空值
  - null
- 2.3.5. 数组类型（list）
  - 元素可以为任意内容，使用空格或者逗号分隔，被分割的每一项代表数组中的一项元素
  - 元素可以为子数组，逗号或空格分隔，也可以使用()进行分隔
  - ()中内容为空时，会被识别为null，同时在编译时数组元素为null或者()会被忽略
  - 对数组进行遍历时，下标索引会从1开始进行遍历
- 2.3.6. 字典类型(map)
  - 使用()，内容为key:value的形式，如(key1:value1, key2: value2)
  - 使用map-get函数获取对应value
- 2.3.7. 颜色类型
  - 使用字符串，#ff00ff（十六进制），rgb，rgba，hsl，hsla
```
  样例 ./sass-demo/src/数据类型.scss
```
##### 2.4. 嵌套语法
- 使用嵌套实现CSS后代选择器(.parent .child)
- 使用&代表父元素，实现伪类选择器(.parent:before)
- 可以使用嵌套语法实现属性的编译
```
  样例 ./sass-demo/src/嵌套语法.scss
```
##### 2.5. 插值语法
- 使用#{}进行变量的引入，与js中${}实现效果一致
- 在calc函数中使用#{},不会直接计算结果，而是将#{}中的内容作为参数，编译后的结果仍然为calc函数；不使用#{}编译后结果为实际值
- 注释中也可以使用#{}
```
  样例 ./sass-demo/src/插值语法.scss
```
##### 2.6. 运算
- 2.6.1. calc
  - 使用calc()函数进行运算，当参数的单位一致时，会直接计算结果
- 2.6.2. max/min
  - 分别获取参数的最大值或者最小值
- 2.6.3. clamp
  - 参数有三个，分别是最小值，当前值，最大值
  - 当前值小于最小值，默认取最小值；大于最大值，默认取最大值；在最小值与最大值之间，则取当前值
```
  样例 ./sass-demo/src/运算.scss
```
##### 2.7. if语法
- 2.7.1. 三元运算符
  - 使用if(condition, value1, value2)
- 2.7.2. @if
  - 使用@if,@else if,@else来实现if,else if,else
```
  样例 ./sass-demo/src/if语法.scss
```
##### 2.8. for语法
- 使用@for $var from num1 to num2或者使用@for $var from num1 through num2
- 使用to时，不包含结束索引，使用through会包含结束索引
```
  样例 ./sass-demo/src/for语法.scss
```
##### 2.9. while语法
- 使用@while实现while语法，注意在while循环体内需要实现变量更新，避免死循环
```
  样例 ./sass-demo/src/while语法.scss
```
##### 2.10. each语法
- 使用@each实现对list或者map的遍历
- @each $item in list或者@each $key, $value in map
```
  样例 ./sass-demo/src/each语法.scss
```
##### 2.11. 混入语法
  - 使用@mixin关键字进行混入内容的定义；使用@include关键字进行混入内容的使用
  - @mixin中也可以使用@include混入其他内容
  - 当外层直接使用@include时，必须保证@mixin中存在元素
  - @mixin可以使用参数，与函数参数类型，可以设置默认值
  - 参数使用可以按照索引，名称或者展开符进行参数传递
  - ...展开符也可以用于展开变量为实际属性值
  - @content关键字用于占位，与插槽功能类似，在@include中可以实现具体的css样式
  - @content中存在作用域，作用域相互隔离，同时子作用域中的优先级较高
```
  样例 ./sass-demo/src/混入语法.scss
```
##### 2.12. 函数
  - 使用@function定义函数
  - sass提供了许多内置函数，可参考sass官网文档
```
  样例 ./sass-demo/src/函数.scss
```
##### 2.13. 规则
  - 2.13.1. @import
    - 用于导入其他scss文件，导入后编译只会生成一个css文件，导入文件不会进行编译
    - 被导入的文件之间的变量、混合体、函数存在共享，不同文件允许交叉使用变量、混合体、函数
    - 使用_命名的scss文件，被称为部分文件，只能用于导入编译使用，不生成css文件内容
    - 导入的文件为sass或者scss时，可以不加后缀
    - 支持嵌套，@import规则允许在对应的{}中使用，不仅仅只能写在文件开头
    - 文件后缀为.css/文件已http://开头/url()/包含media查询的，编译后不会读取导入文件信息，而是将@import语句原封不动编译进来
  - 2.13.2. @media
    - @media进行媒体查询，
    - 允许使用变量进行媒体查询
    - 运行使用混合体
  - 2.13.3. @extend
    - @extend用于实现继承关系，实现样式复用
    - 与@mixin区别，@mixin不会产生css样式，@extend会产生默认样式
    - @mixin可以使用变量，@extend无法使用变量
    - @mixin通常用于部分样式的抽象与实现；@extend只能用于继承
    - %占位符，用于继承部分样式，但又不希望被继承的样式被编译出来
  - 2.13.4. @at-root
    - 用于将嵌套中的样式提取到全局
    - 支持提取一个类，或者多个类；多个类时需要将要提取的类都放在同一个{}中
```
  样例 ./sass-demo/src/规则/规则.scss
```
#### 3. 编译
##### 3.1. 手动编译
- 创建scss文件，写入文件内容后，执行scss的编译compile函数，生成对应的css文件
```
  样例 ./sass-demo/src/index.ts
```
#### 3.2. 自动编译
- VSCode插件：scss to css，保存scss文件后，自动在./dist/目录生成css文件
## CSS后处理器
### postcss
#### 1. 定义
- css后处理器主要是用于对于css文件进行处理，例如兼容性处理、压缩代码、功能增强、代码检查与规范，使用postcss插件可以方便实现以上的功能
#### 2. 插件
- autoprefixer：自动为CSS中的属性添加浏览器前缀，以确保跨浏览器兼容性
- cssnext：使开发者能够使用尚未在所有浏览器中实现的CSS特性，如自定义属性（变量）、颜色函数等
- cssnano：优化并压缩CSS代码，以减小文件大小
- postcss-import：在一个CSS文件中导入其他CSS文件，实现CSS代码的模块化
- postcss-nested：支持CSS规则的嵌套，使CSS代码更加组织化和易于维护
- postcss-custom-properties：支持使用原生CSS变量（自定义属性）
- stylelintCSS代码检查工具，旨在帮助开发者发现和修复潜在的CSS代码问题
#### 3. postcss-cli
- package.json中配置postcss命令，直接使用postcss对css文件进行处理
```bash
  # 安装postcss-cli依赖 
  pnpm add -D postcss-cli
  # package.json配置build脚本
  # 将./src/index.css原始文件进行编译并生成编译后文件./dist/build.css
  postcss ./src/index.css -o ./dist/build.css
  # 不带源码映射
  postcss ./src/index.css -o ./dist/build.css --no-map
  # 监听变化
  postcss ./src/index.css -o ./dist/build.css --watch
```
- 脚本配置
  - -o 编译后的文件包含源码映射
  - --no-map 编译后的文件不带源码映射
  - --watch 监听原始文件是否变化，变化后执行编译命令
  - 官方文档：https://www.npmjs.com/package/postcss-cli
```
  样例 ./postcss-demo
```
#### 4. 配置文件(postcss.config.ts)
- 要使用配置文件功能，可以在项目的根目录下面创建一个名为 postcss.config.js 的文件，当你使用 postcss-cli 或者构建工具（webpack、vite）来进行集成的时候，postcss 会自动加载配置文件
- 官方文档：https://github.com/postcss/postcss-load-config
- 可选参数
   1. plugins {Array} 所有的插件以及插件配置
   2. map {String|Object} 是否支持源码映射，默认为false
   3. syntax {{String|Function}} 用于指定postcss使用的css语法，sass/less
   4. parser {String|Function} 将默认的CSS语法解析为语法树，Postcss 默认的解析器为 postcss-safe-parser，负责将css字符串解析为CSS AST
   5. stringifier {String|Function} 将CSS AST转为css字符串的规则解析器
   6. from/to 一般不使用，定义入口文件，出口文件，通常由打包工具(webpack/vite)配置
```
  样例 ./postcss-demo-2/post.config.js
```
#### 5. 插件介绍
  ##### 5.1 autoprefixer

- 用于兼容不同浏览器，添加前缀、编译成浏览器可以生效的css代码

- browserlist 兼容浏览器版本配置信息

  - last n versions 兼容最近n个版本
  - n% 支持全球使用率超过 n% 的浏览器
  - cover n：覆盖n%的浏览器
  - not dead：支持所有更新中的浏览器
  - not ie<11：不支持ie11以下的浏览器
  - chrome>=n 支持 chrome浏览器大于等于n的版本
  - 官方文档：https://github.com/browserslist/browserslist#full-list
  - https://github.com/browserslist/browserslist#query-composition

  - 配置方式
    - 根目录添加.browserslistrc
    - package.json配置
      ```json
        {
          "name": "xxx",
          "version": : "xxx",
          ...
          "browserslist": [
            "> 1%",
            "last 2 versions",
            "not dead"
          ]
        }
      ```
    - postcss.config.js插件autoprefixer配置

  ##### 5.2. cssnano

- 用于进行css代码压缩
- 官方文档：https://cssnano.co/
- 自定义cssnano默认的功能
- cssnano配置属性：https://cssnano.co/docs/what-are-optimisations/
  ```js
    cssnano({
        preset: [
          'default',
          {
            discardComments: false,
            discardEmpty: false
          }
        ]
      })
  ```

  ##### 5.3. stylelint

- 格式化css样式，统一风格
  ```bash
    # stylelint 格式化css样式工具
    # stylelint-config-standard 格式化css默认规则
    pnpm add -D stylelint stylelint-config-standard
  ```
- 项目根目录添加.stylelintrc.json，用于配置格式化规则
  ```json
  {
    "extends": "stylelint-config-standard",
    "rules": {
        "comment-empty-line-before": null
    }
  }
  ```
- 校验规则：https://stylelint.io/user-guide/rules/
- stylelint插件的fix 配置项配置为true, 自动修复问题

  ##### 5.4. postcss-preset-env

- 使用css新特性时，为了避免旧版浏览器无法运行新的css语法，使用postcss-preset-env，将最新语法转为浏览器可以识别的语法
- 配置项
  - stage 设置要使用的特性的阶段，默认值为（0-4）。数字越小，稳定性越低
  - browsers 设置目标浏览器范围，如：'last 2 versions' 或 '>1%'
  - autoprefixer：设置自动添加浏览器厂商前缀的配置，如：{grid: true }
  - preserve 是否保留原始CSS代码，默认为false。如果设置为true，则会在转换后的代码后面保留原始代码，以便新浏览器优先使用新语法

  ##### 5.5. postcss-import

- 导入多个文件时，进行合并，避免http请求多次，提升性能
- 配置项
  - path 查找路径，默认为当前文件夹
  - plugins 在执行import操作，可以添加其他的插件，优先进行处理后在执行import操作
  - 官方文档：https://github.com/postcss/postcss-import

  ##### 5.6. purgecss

- 对css中没有使用到的内容进行移除，减少css文件大小，提升性能
- 官方文档：https://purgecss.com/
  ```bash
    pnpm add @fullhuman/postcss-purgecss -D
  ```
- 配置项
  - safelist 可以指定一个字符串的值，或者指定一个正则表达式，该配置项目所对应的值（CSS 样式规则）始终保留，即便在参照文件中没有使用到也需要保留
    ```js
      purgecssPlugin({
          content: ['./src/**/*.html', './src/**/*.js'],
          // 匹配 active- 开头的类名，这些类名即便在项目文件中没有使用到，但是也不要删除
          safelist: [/^active-/],
      })
    ```

#### 6. 注意点
- 使用postcss插件要注意顺序，引入的插件存在前后顺序的差异，第一个插件的结果会作为第二个插件的输入，进行处理后，交给第三个插件；顺序不对会导致报错，无法进行css处理生成编译后文件
#### 7. 代码位置
  - ./postcss-demo-2
## 实际开发-旋转魔方
  - ./cube-3d-demo

## tailwindcss

  ### 官网地址：https://tailwindcss.com/
  ### 使用步骤
  1. 创建项目后，安装tailwindcss依赖
      ```bash
        pnpm add -D tailwindcss @tailwindcss/cli
      ```
  2. 创建./src/styles/index.css 并添加以下代码
      ```css
        @import "tailwindcss";
      ```
  3. 添加package.json启动命令
      ```json
         "scripts": {
          // 使用@tailwindcss/cli命令行启动，-i 输入文件路径；-o 输出文件路径 --watch 监听输入文件变化，变化同步更新输出文件
            "dev": "npx @tailwindcss/cli -i ./src/styles/input.css -o ./dist/output.css --watch"
        }
      ```
  4. index.html引入输出文件路径
      ```html
        <link href="../dist/output.css" rel="stylesheet" />
      ```
  ### 使用方法
  - 官方网站：https://www.tailwindcss.cn/docs/v4-beta
  - 按照官网对应实例使用即可
    ```
      样例：./tailwindcss-demo
      样例2(loading动画)：./taildindcss-demo-2
    ```

### 插件

 - 官网插件 https://github.com/aniftyco/awesome-tailwindcss

### 组件

 - 使用@apply关键字进行一组tailwind原子组件的定义，用于复用相同样式在不同地方，减少后续修改工作量，便于维护

   ```
   样例 ./tailwindcss-demo-3
   ```


### 响应式设计

- sm: >=640px

- md: >=768px

- lg: >=1024px

- xl: >=1280px

- 2xl: >=1536px

- 使用

  ```html
  <div class="sm:w-5 md:w-10 lg:w-15 xl:w-20 2xl:w-25"></div>
  ```

  ```
  样例 ./tailwindcss-demo-4
  ```


### 深色模式

 - tailwindcss默认支持浅色模式/深色模式

 - 使用dark:变体实现深色模式下的样式

   ```html
   <!-- 浅色模式字体颜色为黑色，深色模式下为白色 -->
   <div class="text-black dark:text-white">test</div>
   ```

- 默认情况下，tailwindcss会识别系统当前主题，自动切换浅色或者深色主题

- 可以进行手动切换主题色

  ```css
  /* input.css */
  /* 添加该代码后，可以手动进行主题切换 */
  @custom-variant dark (&:where(.dark, .dark *));
  ```

  ```js
  // 手动切换浅色或深色主题
  const btn = document.getElementById("toggle");
  btn.onclick = function () {
     document.documentElement.classList.toggle("dark");
  };
  ```


### 生产构建优化

	#### Tree Shaking

 - tailwindcss 里面要进行 tree shaking 操作，会用到 purgecss 插件，该插件实际上就是做 css 版本的 tree shaking，会将没有使用到的样式类进行一个删除。tailwindcss 里面是内置了 purgecss 插件的，原因很简单，tailwindcss 是一定需要做 tree shkaing 的，因为tailwindcss 里面有大量的原子类。

 - v2.0版本开始会默认配置purgecss，无需手动配置

 - @source inline用于保存原子类，不管有没有使用到该原子类，打包后会包含该原子类

   ```css
   @import "tailwindcss";
   @source inline("underline");
   
   /* 生成构建后的css中会包含underline */
   .underline {
     text-decoration-line: underline;
   }
   ```

#### 限制变体生成

- tailwindcss中变体hover、focus等会包含着原子类，当变体与原子类组合后，会生成大量css样式，需要进行处理，将没有使用过的组合删除

- v2.0中默认会对变体生成进行处理，删除没有使用到的变体

- @source inline也可以保存变体以及原子类的组合

  ```css
  @import "tailwindcss";
  @source inline("{hover:,focus:,}underline");
  
  /* 生成构建后的css中会包含hover:underline,focus:underline */
  .underline {
    text-decoration-line: underline;
  }
  @media (hover: hover) {
    .hover\:underline:hover {
      text-decoration-line: underline;
    }
  }
  @media (focus: focus) {
    .focus\:underline:focus {
      text-decoration-line: underline;
    }
  }
  ```

#### 使用postcss进行后处理

```bash
pnpm add cssnano postcss-cli @tailwindcss/postcss autoprefixer -D
```
添加postcss.config.js,并进行如下配置
```js
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import tailwindcss from "@tailwindcss/postcss";

const config = {
  plugins: [tailwindcss(), autoprefixer(), cssnano()].filter(Boolean),
};

export default config;

```

