import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/advancedTable/list',
    method: 'get',
    params: query
  })
}