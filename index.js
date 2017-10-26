const schedule = require("node-schedule");
const request = require('request');
const SMSClient = require('@alicloud/sms-sdk')
const config = require('./config')

const ACCESS_KEY_ID = config.ACCESS_KEY_ID;
const SERECT_ACCESS_KEY = config.SERECT_ACCESS_KEY
const SIGN_NAME = config.SIGN_NAME;
const TEMPLATE_CODE = config.TEMPLATE_CODE;
const CAI_YUN_API_KEY = config.CAI_YUN_API_KEY;
const LONGITUDE = config.LONGITUDE;
const LATITUDE = config.LATITUDE;
const TARGET_PHONE = config.TARGET_PHONE;

console.log("配置文件如下\n%s\n",JSON.stringify(config, null, "\t"))

var skyconMap = new Map();
skyconMap.set("CLEAR_DAY","晴天");
skyconMap.set("CLEAR_NIGHT","晴夜");
skyconMap.set("PARTLY_CLOUDY_DAY","多云");
skyconMap.set("PARTLY_CLOUDY_NIGHT","多云");
skyconMap.set("CLOUDY","阴");
skyconMap.set("RAIN","雨");
skyconMap.set("SNOW","雪");
skyconMap.set("WIND","风");
skyconMap.set("FOG","雾");
skyconMap.set("HAZE","霾");
skyconMap.set("SLEET","冻雨");

var getweather = async (token, longitude, latitude) => {
    url = 'https://api.caiyunapp.com/v2/' + token + '/' + longitude + ',' + latitude + '/realtime'
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            weather = JSON.parse(body);
            result = {
                temperature: weather.result.temperature,
                pm25: weather.result.pm25,
                skycon: skyconMap.get(weather.result.skycon)
            }
            console.log("天气状况\n%s\n",JSON.stringify(result, null, "\t"))
            say(TARGET_PHONE,JSON.stringify(result))
        }
    })
}

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(0, 6)];
rule.hour = config.REMIND_TIME.split(':')[0];
rule.minute = config.REMIND_TIME.split(':')[1];
var j = schedule.scheduleJob(rule, function () {
    console.log("当前短信发送时间",getNowFormatDate())
    getweather(CAI_YUN_API_KEY, LONGITUDE, LATITUDE)
});
var date = new Date();

console.log("每日发送时间%s:%s",rule.hour,rule.minute)
console.log("当前脚本运行时间",getNowFormatDate())

function say(phone, param) {
    const accessKeyId = ACCESS_KEY_ID
    const secretAccessKey = SERECT_ACCESS_KEY
    let smsClient = new SMSClient({ accessKeyId, secretAccessKey })
    smsClient.sendSMS({
        PhoneNumbers: phone,
        SignName: SIGN_NAME,
        TemplateCode: TEMPLATE_CODE,
        TemplateParam: param
    }).then(function (res) {
        let { Code } = res
        if (Code === 'OK') {
            console.log(JSON.stringify(res, null, "\t"))
        }
    }, function (err) {
        console.log(JSON.stringify(err, null, "\t"))
    })
}


function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}