export default {
  '/src/api/advancedTable.js': 
    {
      code: `
import request from '../utils/request'

export function fetchList(query) {
  return new Promise((reslove, reject) => {
    reslove({"code":20000,"data":{"total":3,"items":[{"id":"500000197807216356","title":"Wawskcaj ymybojkc qsmdw.","status":"published","author":"name","display_time":"2015-08-11 01:04:27","pageviews":2324},{"id":"710000199901126646","title":"Irkdbo quemrg nnezv.","status":"deleted","author":"name","display_time":"1975-06-15 20:33:58","pageviews":2590},{"id":"360000200907270905","title":"Imrljmwvp sadekiv jithboi.","status":"deleted","author":"name","display_time":"2014-11-30 02:08:39","pageviews":3374}]}})
  });
  // return request({
  //   url: '/advancedTable/list',
  //   method: 'get',
  //   params: query
  // })
}
      `
    }
  }      