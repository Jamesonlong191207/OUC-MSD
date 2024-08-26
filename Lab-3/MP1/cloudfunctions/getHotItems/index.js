// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  try {
    return await db.collection('trash').orderBy('click_times', 'desc').limit(20).get()
  } catch (e) {
    console.error(e)
  }
}