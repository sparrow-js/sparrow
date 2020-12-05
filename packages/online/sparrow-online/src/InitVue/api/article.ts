export default {
  '/src/api/article.js': 
    {
      code: `
import request from '../utils/request'

export function fetchList(query) {
  return new Promise((reslove, reject) => {
    reslove({
      "code": 20000,
      "data": {
        "total": 100,
        "items": [ {
          "id": 6,
          "timestamp": 509330138591,
          "author": "Paul",
          "reviewer": "Carol",
          "title": "Tpydrt Ppnlx Kppc Voruc Dicj Nwpgr Rlm",
          "content_short": "mock data",
          "content": "",
          "forecast": 47.14,
          "importance": 2,
          "type": "CN",
          "status": "draft",
          "display_time": "1979-08-20 03:40:35",
          "comment_disabled": true,
          "pageviews": 3882,
          "image_uri": "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          "platforms": ["a-platform"]
        }, {
          "id": 7,
          "timestamp": 301547878102,
          "author": "Eric",
          "reviewer": "Patricia",
          "title": "Ocoslpecv Yqtpvee Ifyvimap Xxpqocr Gjfjydmyz Gic",
          "content_short": "mock data",
          "content": "",
          "forecast": 22.28,
          "importance": 2,
          "type": "US",
          "status": "published",
          "display_time": "2013-11-27 17:49:52",
          "comment_disabled": true,
          "pageviews": 2728,
          "image_uri": "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          "platforms": ["a-platform"]
        }, {
          "id": 8,
          "timestamp": 1186797214440,
          "author": "Gary",
          "reviewer": "Shirley",
          "title": "Ismjlvxc Htqm Bhl Gpspgdop Okonktiz Rrpsn",
          "content_short": "mock data",
          "content": "",
          "forecast": 90.88,
          "importance": 2,
          "type": "US",
          "status": "draft",
          "display_time": "1999-10-20 14:12:43",
          "comment_disabled": true,
          "pageviews": 1540,
          "image_uri": "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          "platforms": ["a-platform"]
        }, {
          "id": 9,
          "timestamp": 1126545182776,
          "author": "Michelle",
          "reviewer": "Joseph",
          "title": "Koncpw Urxcvsbe Domyunbq Wespvfd Lnyn Kvxudjubvu Proibmcfu",
          "content_short": "mock data",
          "content": "",
          "forecast": 31.48,
          "importance": 2,
          "type": "JP",
          "status": "draft",
          "display_time": "2006-11-05 10:03:51",
          "comment_disabled": true,
          "pageviews": 1496,
          "image_uri": "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          "platforms": ["a-platform"]
        }, {
          "id": 10,
          "timestamp": 1508022316531,
          "author": "Sharon",
          "reviewer": "Sandra",
          "title": "Eevfb Xtfgyl Hnaoaoecig Letspdbcfn Wwmw Mqlodlk",
          "content_short": "mock data",
          "content": "",
          "forecast": 27.65,
          "importance": 1,
          "type": "JP",
          "status": "draft",
          "display_time": "2008-04-21 21:49:01",
          "comment_disabled": true,
          "pageviews": 1099,
          "image_uri": "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          "platforms": ["a-platform"]
        }, {
          "id": 11,
          "timestamp": 600015124310,
          "author": "Frank",
          "reviewer": "Gary",
          "title": "Qnhpkvxgp Gldthpzy Xcbblinpqs Cypdpr Rttkqqcay",
          "content_short": "mock data",
          "content": "",
          "forecast": 18.46,
          "importance": 1,
          "type": "CN",
          "status": "published",
          "display_time": "1982-05-30 09:46:33",
          "comment_disabled": true,
          "pageviews": 1334,
          "image_uri": "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          "platforms": ["a-platform"]
        }, {
          "id": 12,
          "timestamp": 479043556383,
          "author": "Barbara",
          "reviewer": "Mary",
          "title": "Tjsotulea Wjpv Rbdewptyn Ydz Jkkomv Jqwjnhv Vnuu Sxunll Zfgjphpxt Hhfmi",
          "content_short": "mock data",
          "content": "",
          "forecast": 67.36,
          "importance": 2,
          "type": "JP",
          "status": "published",
          "display_time": "2005-03-20 19:41:53",
          "comment_disabled": true,
          "pageviews": 1086,
          "image_uri": "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          "platforms": ["a-platform"]
        }, {
          "id": 13,
          "timestamp": 138514999711,
          "author": "Robert",
          "reviewer": "Kimberly",
          "title": "Xldgupght Mdlrk Ppaqe Ibmsyybqn Gxsht Fnszqz Uxjysigw Pciokqwjf Gug",
          "content_short": "mock data",
          "content": "",
          "forecast": 9.91,
          "importance": 3,
          "type": "EU",
          "status": "published",
          "display_time": "1979-08-04 00:23:38",
          "comment_disabled": true,
          "pageviews": 4198,
          "image_uri": "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          "platforms": ["a-platform"]
        }, {
          "id": 14,
          "timestamp": 58141992677,
          "author": "Ronald",
          "reviewer": "Barbara",
          "title": "Zcbgye Didjhp Fvsoudjv Hxmcgtg Lsfse Smih",
          "content_short": "mock data",
          "content": "",
          "forecast": 51.63,
          "importance": 1,
          "type": "CN",
          "status": "published",
          "display_time": "2012-11-26 19:59:51",
          "comment_disabled": true,
          "pageviews": 2409,
          "image_uri": "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          "platforms": ["a-platform"]
        }, {
          "id": 15,
          "timestamp": 1316292240838,
          "author": "Mary",
          "reviewer": "Sarah",
          "title": "Kogthrsx Ujpuvd Ajse Fcurrdt Fkssilkh Neffkorc Kwuhq Jtgo Kllw",
          "content_short": "mock data",
          "content": "",
          "forecast": 98.57,
          "importance": 3,
          "type": "US",
          "status": "draft",
          "display_time": "2014-04-26 10:58:48",
          "comment_disabled": true,
          "pageviews": 3898,
          "image_uri": "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          "platforms": ["a-platform"]
        }, {
          "id": 16,
          "timestamp": 747532887220,
          "author": "Barbara",
          "reviewer": "Karen",
          "title": "Xqckggh Sjvhcfkbd Jjcbrvop Veyabbs Ylhunqyfoz Iquwa Hdfvitqg Yeakxuuobs Zlk",
          "content_short": "mock data",
          "content": "",
          "forecast": 34.22,
          "importance": 2,
          "type": "JP",
          "status": "published",
          "display_time": "1983-02-02 19:39:05",
          "comment_disabled": true,
          "pageviews": 493,
          "image_uri": "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          "platforms": ["a-platform"]
        }, {
          "id": 17,
          "timestamp": 666774319883,
          "author": "Frank",
          "reviewer": "Timothy",
          "title": "Punodro Buire Palxjiyini Wcomxdl Btvxj Sfduv",
          "content_short": "mock data",
          "content": "",
          "forecast": 6.36,
          "importance": 3,
          "type": "CN",
          "status": "published",
          "display_time": "2007-04-05 13:45:53",
          "comment_disabled": true,
          "pageviews": 2503,
          "image_uri": "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          "platforms": ["a-platform"]
        }, {
          "id": 18,
          "timestamp": 1129260474750,
          "author": "Sarah",
          "reviewer": "Scott",
          "title": "Blcntkkx Dcedyyesc Hwdj Yvwmhbory Onevehbymr Sdlmxp",
          "content_short": "mock data",
          "content": "",
          "forecast": 29.22,
          "importance": 3,
          "type": "JP",
          "status": "draft",
          "display_time": "1974-10-26 10:14:12",
          "comment_disabled": true,
          "pageviews": 3150,
          "image_uri": "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          "platforms": ["a-platform"]
        }, {
          "id": 19,
          "timestamp": 1302012739254,
          "author": "John",
          "reviewer": "Karen",
          "title": "Kkbqatbl Zvqxhg Xusknp Lwudgough Cjxcpbxmh Cvti Knjglnff Dvc Molexw",
          "content_short": "mock data",
          "content": "",
          "forecast": 43.47,
          "importance": 2,
          "type": "US",
          "status": "draft",
          "display_time": "1978-08-23 00:43:15",
          "comment_disabled": true,
          "pageviews": 532,
          "image_uri": "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          "platforms": ["a-platform"]
        }, {
          "id": 20,
          "timestamp": 792126050684,
          "author": "Dorothy",
          "reviewer": "Charles",
          "title": "Rcvtrle Dgord Rkshiyrns Heaplaremf Hagjmovcps Iysy Qbrt Caxgvifso Cdvlwobp Jsrtwbko",
          "content_short": "mock data",
          "content": "",
          "forecast": 48.92,
          "importance": 2,
          "type": "JP",
          "status": "draft",
          "display_time": "1978-03-15 22:19:32",
          "comment_disabled": true,
          "pageviews": 3683,
          "image_uri": "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3",
          "platforms": ["a-platform"]
        }]
      }
    })
  });
  // return request({
  //   url: '/vue-element-admin/article/list',
  //   method: 'get',
  //   params: query
  // })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}

      `
    }
  }    