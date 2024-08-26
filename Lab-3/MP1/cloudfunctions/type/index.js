// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  try {
    return await db.collection('type').get()
  } catch (e) {
    console.error(e)
  }
}