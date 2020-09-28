import request from "@/utils/request";
export function getList(params) {
  return request({
    url: "/api/getList",
    method: "get",
    params
  });
}

export function save(data) {
  return request({
    url: "/api/save",
    method: "post",
    data
  });
}
