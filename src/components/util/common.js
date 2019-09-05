// 生成唯一Key
export function makeKey() {
  return Date.parse(new Date()) + "_" + Math.ceil(Math.random() * 99999);
}

export function copyObj(Obj) {
  return JSON.parse(JSON.stringify(Obj))
}

