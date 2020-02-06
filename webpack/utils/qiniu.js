/**
 * 
 * @authors linteng (875482941@qq.com)
 * @date    2019-02-13 15:28:13
 */

'use strict'

const qiniu = require('qiniu')

function makeMac (uploadCtx) {
  const { accessKey, secretKey } = uploadCtx.cdnConfig
  uploadCtx.mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  return uploadCtx.mac
}

function makeConfig (uploadCtx) {
  uploadCtx.config = new qiniu.conf.Config();
  // 空间对应的机房
  uploadCtx.config.zone = uploadCtx.cdnConfig.zone;
  return uploadCtx.config
}

function makeToken (uploadCtx) {
  const { bucket } = uploadCtx.cdnConfig
  var options = {
    scope: bucket,
  };
  var putPolicy = new qiniu.rs.PutPolicy(options);
  uploadCtx.token = putPolicy.uploadToken(uploadCtx.mac);
  return uploadCtx.token
}

function upload (uploadCtx) {
  
  let fileName = uploadCtx.fileConfig.fileName
  let putExtra = new qiniu.resume_up.PutExtra();
  putExtra.fname = fileName.slice(fileName.lastIndexOf('/') + 2)
  // putExtra.resumeRecordFile = 'progress.log';
  
  var resumeUploader = new qiniu.resume_up.ResumeUploader(uploadCtx.config);
  return new Promise((yes, no) => {
    resumeUploader.putFile(
      uploadCtx.token, 
      fileName, 
      uploadCtx.fileConfig.filePath, 
      putExtra, 
      function(respErr, respBody, respInfo) {
        if (respErr) {
          no(respErr)
        }
        if (respInfo.statusCode == 200) {
          yes(respBody);
        } else {
          yes(respInfo);
        }
      }
    )
  })
}

module.exports = async function (filesConfig, cdnConfig) {
  let uploadCtx = { cdnConfig }
  makeMac(uploadCtx)
  makeConfig(uploadCtx)
  makeToken(uploadCtx)
  // console.log({uploadCtx})
  for (let it of filesConfig) {
    let res = await upload({...uploadCtx, fileConfig: it})
    if (res.key) {
      console.log(`文件 ${it.fileName} 已上传七牛`)
    } else {
      console.log(`文件 ${it.fileName} 上传七牛失败`)
    }
  }
}