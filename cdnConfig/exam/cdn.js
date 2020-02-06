const qiniu = require("qiniu");
module.exports = {
  PROD: {//prod
    accessKey: '',
    secretKey: '',
    zone: qiniu.zone.Zone_z0,
    bucket: '',
    qiniuBaseUrl: '//xx.com/',
  },
  DEV: {//dev
    accessKey: '',
    secretKey: '',
    zone: qiniu.zone.Zone_z2,
    bucket: '',
    qiniuBaseUrl: '//yy.com/',
  },
  TEST: {//test
    accessKey: '',
    secretKey: '',
    zone: qiniu.zone.Zone_z2,
    bucket: '',
    qiniuBaseUrl: '//yy.com/',
  }
}