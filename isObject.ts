/**
 * 判断目标对象是否为`Object`
 * 因为`typeof null === 'object'`, 所以使用`!!obj`来排除`null`
 */
export default function isObject(obj: any): obj is {} {
  return !!obj && typeof obj === 'object';
}