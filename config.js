config = {
  ACCESS_KEY_ID: 'ACCESS_KEY_ID',
  SERECT_ACCESS_KEY: 'SERECT_ACCESS_KEY',
  SIGN_NAME: 'namd',
  TEMPLATE_CODE: 'TEMPLATE_CODE',
  CAI_YUN_API_KEY: 'CAI_YUN_API_KEY',
  LONGITUDE: 'LONGITUDE',
  LATITUDE: 'LATITUDE',
  TARGET_PHONE: 'TARGET_PHONE',
  REMIND_TIME:'REMIND_TIME'
}

module.exports = (() => {

  if (process.env.ACCESS_KEY_ID != undefined) {
    config.ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
  }

  if (process.env.SERECT_ACCESS_KEY != undefined) {
    config.SERECT_ACCESS_KEY = process.env.SERECT_ACCESS_KEY;
  }

  if (process.env.SIGN_NAME != undefined) {
    config.SIGN_NAME = process.env.SIGN_NAME;
  }
  if (process.env.TEMPLATE_CODE != undefined) {
    config.TEMPLATE_CODE = process.env.TEMPLATE_CODE;
  }
  if (process.env.CAI_YUN_API_KEY != undefined) {
    config.CAI_YUN_API_KEY = process.env.CAI_YUN_API_KEY;
  }
  if (process.env.LONGITUDE != undefined) {
    config.LONGITUDE = process.env.LONGITUDE;
  }
  if (process.env.LATITUDE != undefined) {
    config.LATITUDE = process.env.LATITUDE;
  }
  if (process.env.TARGET_PHONE != undefined) {
    config.TARGET_PHONE = process.env.TARGET_PHONE;
  }
  if (process.env.REMIND_TIME != undefined) {
    config.REMIND_TIME = process.env.REMIND_TIME;
  }

  return config
})()
