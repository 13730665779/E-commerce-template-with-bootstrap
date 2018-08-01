/**
 * Created by boy on 2017/7/10.
 */
var express = require("express");
var app = express();

//设置静态文件
app.use(express.static('public'));
//指定模板引擎
app.set("views engine", 'ejs');
//指定模板位置
app.set('views', __dirname + '/views');

//利用模板文件home.ejs渲染为html

app.get("/index", function(req, res) {


    res.render('index', {

        }

    );
});

app.get("/codes", function(req, res) {


    res.render('codes', {

        }

    );
});
app.get("/contact", function(req, res) {


    res.render('contact', {

        }

    );
});
app.get("/electronics", function(req, res) {


    res.render('electronics', {

        }

    );
});
app.get("/mens", function(req, res) {


    res.render('mens', {

        }

    );
});

app.get("/single", function(req, res) {


    //1, 引入模块
    var ImageUtil = require('./dao/ImageUtil');
    //2,创建对象
    imageUtil = new ImageUtil();
    imageUtil.init();
    //1, 引入腾讯模块
    var QQUtil = require('./util/QQutil');
    //2,创建对象
    qqUtil = new QQUtil();
    qqUtil.init();
    //3,查询语句
    imageUtil.querySingle(function (imageData) {
        //根据数据，获得key值
        var length = imageData.length;
        for (let i = 0; i < length; i++) {
            let key = imageData[i].imageKey;
            //到腾讯云平台获得图片地址
            qqUtil.query(key,function (url) {
                imageData[i].imageKey=url;
            })
        }
        res.render('single', {imageData: imageData})
    });
});

app.get("/womens", function(req, res) {

    //1, 引入模块
    var ImageUtil = require('./dao/ImageUtil');
    //2,创建对象
    imageUtil = new ImageUtil();
    imageUtil.init();
    //1, 引入腾讯模块
    var QQUtil = require('./util/QQutil');
    //2,创建对象
    qqUtil = new QQUtil();
    qqUtil.init();
    //3,查询语句
    imageUtil.queryWomens(function (imageData) {
        //根据数据，获得key值
        var length = imageData.length;
        for (let i = 0; i < length; i++) {
            let key = imageData[i].imageKey;
            //到腾讯云平台获得图片地址
            qqUtil.query(key,function (url) {
                imageData[i].imageKey=url;
            })
        }
        res.render('womens', {imageData: imageData})
    });
});

 app.listen(8999);