// 
/**
 * `工具方法`: 生成唯一Key
 * `时间戳`+`随机数`的简单方式生成
 *
 * @export
 * @returns 唯一key值
 */
export function makeKey() {
  return Date.parse(new Date()) + "_" + Math.ceil(Math.random() * 99999);
}

/**
 * `工具方法`: 拷贝对象(深拷贝)
 *
 * @export
 * @param {object} Obj 需要拷贝的对象
 * @returns 拷贝后的对象
 */
export function copyObj(Obj) {
  return JSON.parse(JSON.stringify(Obj));
}

/**
 * `工具方法`: 判断是否为数字,可输入多个值
 *
 * @export
 * @param {string} param 需要判断的值
 */
export function isNumber(...param) {
  var regPos = /^\d+(\.\d+)?$/; //非负浮点数
  // var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  param.forEach(val => {
    if (!regPos.test(val)) {
      throw new Error("not_a_number");
    }
  });
}

/**
 * `工具方法`: 判断是否为空,可输入多个值
 *
 * @export
 * @param {object} str 需要判断的值
 */
export function isEmpty(...str) {
  str.forEach(val => {
    console.log("val==>>", typeof val);
    if (typeof val == undefined || val == null || val == "") {
      throw new Error("null_message");
    }
  });
}

/**
 * `工具方法`: 弹出提示框
 *
 * @export
 * @param {object} ctx 上下文
 * @param {string} title 标题
 * @param {string} message 信息部分
 * @param {string} type  提示类型
 * @param {number} offset  位置偏移量
 */
export function popNotify(ctx, title, message, type, offset) {
  ctx.$notify({
    title,
    message,
    type,
    offset
  });
}
