#项目日志

1. **特殊说明: novel.js文件夹与package.json是同级的**
2. 下载: git clone - https://github.com/ruanjiayou/novel.js.git
3. 安装: npm install
4. 数据库连接配置在 /src/config/database.js
5. 站点配置在 /src/config/site.js
6. 刷数据库命令: node ./bin/migration.js
7. 默认启用jwt令牌登录,可选session登录
8. 启动服务器: node app.js
9. apidoc文档生成:apidoc -i ./src/routes/ -o ./src/public/apidoc
    (windows用户直接双击 /bin/apidoc.bat)

#### 2017-12-08 13:44:21
```
    1.如何实现持续性?对于还在连载的.
    2.对于已经采集的,如何判别? url/书籍/图片
    3.如何自动对书籍分类?
    4.字数的统计
    5.多线程加速采集
    6.http套装
    书籍的下载/目录/上一章/下一章
```
#### 2017-12-8 23:00:14
```
    present中实现了:对分页和返回json处理
```
#### 2017-12-8 23:08:49
```
    数字统计:插画表格按面积算~~
    类型:中文/中文标点/英文/数字
    数字/空格算英文
    中文(包括中文标点)算两个字符
    小说字数:中文+数字
    我认为字数应该中文(包标点+英文(包数字
```
#### 2017-12-9 01:20:19
```
    书籍字数统计功能 应该补充:create后更新count 等
```
#### 2017-12-9 16:16:20
```
    队列表:mongoDb
    name author url stime etime
```
#### 2017-12-16 17:01:47
```
    jwt验证
```