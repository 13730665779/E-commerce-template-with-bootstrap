function QQutil() {
    
    this.init=function () {
        // 引入模块
        var COS = require('cos-nodejs-sdk-v5');
        this.cos = new COS({
            // 必选参数
            SecretId: "AKID7IWq5vTCpME1e6vUTOFza2JPdviOiXs5",
            SecretKey: "Qgn3HLJ8yfDi3FJDxcFk9auCNPM9oMl3",
        });
    }
    
    this.insert=function (key,path,fs,call) {
        this.cos.putObject({
            Bucket: "drifter-1256448433", /* 必须 */ // Bucket 格式：test-1250000000
            Region: "ap-chengdu",
            Key: key, /* 必须 */
            TaskReady: function (tid) {
            },
            onProgress: function (progressData) {
                //console.log(JSON.stringify(progressData));
            },
            // 格式1. 传入文件内容
            // Body: fs.readFileSync(filepath),
            // 格式2. 传入文件流，必须需要传文件大小
            Body: fs.createReadStream(path),
            ContentLength: fs.statSync(path).size
        }, function (err, data) {
            if (err) {
                return console.log(err);
            }
            if (data.statusCode == 200) {
                call();
            }
        });

    }
    this.query=function (key,call) {
        var url= this.cos.getObjectUrl({
            Bucket: "drifter-1256448433", /* 必须 */ // Bucket 格式：test-1250000000
            Region: "ap-chengdu",
            Key: key,
            Expires: 600000,
            Sign: true,
        }, function (err, data) {

        });
        call(url);

    }
    
}


module.exports = QQutil;