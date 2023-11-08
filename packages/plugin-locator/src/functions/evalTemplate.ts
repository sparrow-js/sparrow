export function evalTemplate(str: string, params: { [key: string]: string }) {
  let newStr = str;

  Object.entries(params).forEach(([key, value]) => {
    newStr = newStr.replace("${" + key + "}", value);
  });
  return newStr;
}
