import request from "@/utils/request";
export function getList(params) {
  return request({
    url: "/api/getList",
    method: "get",
    params
  });
}
