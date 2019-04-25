/**
 * 在目标对象上定义不可枚举的值, 使用`Object.defineProperty`
 * @param obj 目标对象
 * @param key 要定义的键
 * @param value 要定义的值
 */
export default function def(obj: {}, key: string, value: any) {
  Object.defineProperty(obj, key, {
    value,
    enumerable: false,
    writable: true,
    configurable: true
  });
}