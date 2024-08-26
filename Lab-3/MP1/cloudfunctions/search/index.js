// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
exports.main = async (event, context) => {
  const db = cloud.database()
  try {
    return await db.collection('trash').where({
      name: db.RegExp
        ({
          regexp: event._txt,
          //从搜索栏中获取的value作为规则进行匹配。
          options: 'i'
          //大小写不区分
        })}).get()
  } catch (e) {
    console.error(e)
  }
}
// 云函数入口函数
// exports.main = async (event, context) => {
//   // const wxContext = cloud.getWXContext()
//   console.log(event)
//   const db = cloud.database()
//   try {

    
//     return await db.collection('trash').where
//     ({
//       name: db.RegExp
//         ({
//           regexp: '阿尔卑斯',
//           //从搜索栏中获取的value作为规则进行匹配。
//           options: 'i'
//           //大小写不区分
//         })
//     })
//     .get()
        
  
//   } catch (e) {
//     console.error(e)
//   }
// }