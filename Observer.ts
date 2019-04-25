import def from "./def";
import isObject from "./isObject";

type IGetCallback = (value: any) => any;
type ISetCallback = (newValue: any, oldValue: any) => any;

interface ICallback {
  getCallback?: IGetCallback;
  setCallback?: ISetCallback;
}

export default class Observer {
  private getCallback?: IGetCallback = null;
  private setCallback?: ISetCallback = null;
  private data: any;
  public constructor(data: any, { getCallback, setCallback }: ICallback) {
    this.data = data;
    this.getCallback = getCallback;
    this.setCallback = setCallback;
    this.observe(this.data);
  }
  /**
   * 当`data`为`Array`或`Object`时, 使其具有响应式
   */
  private observe(data: any) {
    if (Array.isArray(data)) {
      this.observeArray(data);
    } else if (isObject(data)) {
      this.observeObject(data);
    }
  }
  /**
   * 1. 使数组上的每个对象具有响应式
   * 2. 修改原型方法
   */
  private observeArray(arr: any[]) {
    this.observeArrayItems(arr);
    this.observeArrayMethods(arr);
  }
  /**
   * 遍历目标数组,使数组上的每个对象具有响应式
   */
  private observeArrayItems(arr: any[]) {
    for (const iterator of arr) {
      this.observeObject(iterator);
    }
  }
  private observeArrayMethods(arr: any[]) {
    const arrayMethods = this.getArrayMethods();
    const protoStr = '__proto__';
    // 为了兼容性, 最好是优雅的扔在原型链上
    if (protoStr in {}) {
      arr[protoStr] = arrayMethods;
    } else {
      for (const key of Object.getOwnPropertyNames(arrayMethods)) {
        def(arr, key, arrayMethods[key]);
      }
    }
  }
  /**
   * 获得具有响应式的数组函数
   */
  private getArrayMethods() {
    const targetMethods = [
      'push',
      'pop',
      'shift',
      'unshift',
      'splice',
      'sort',
      'reverse'
    ];
    const arrayMethods = Object.create(Array.prototype);
    const self = this;
    targetMethods.forEach(methodName => {
      const original: Function = arrayMethods[methodName];
      def(arrayMethods, methodName, function (this: any[], ...args: any[]) {
        const oldValue = [...this];
        const result = original.apply(this, args);
        let inserted = [];
        switch (methodName) {
          case 'push':
          case 'unshift':
            inserted = args;
            break;
          case 'splice':
            inserted = args.slice(2);
            break;
        }
        // 使数组中新添加的元素具有响应式
        self.observeArrayItems(inserted);
        self.setCallback && self.setCallback(this, oldValue);
        return result;
      });
    });
    return arrayMethods;
  }
  /**
   * 遍历目标对象,使每个键具有响应式
   */
  private observeObject(obj: {}) {
    if (!isObject(obj)) {
      return;
    }
    for (const key of Object.keys(obj)) {
      this.defineReactive(obj, key);
      this.observe(obj[key]);
    }
  }
  /**
   * 使目标对象上特定的键具有响应式
   */
  private defineReactive(obj: {}, key: string) {
    // 使用闭包记录当前obj的值
    // 如果把下文所有value替换成obj[key], 会引发get函数的无限递归
    let value = obj[key];
    Object.defineProperty(obj, key, {
      get: () => {
        this.getCallback && this.getCallback(value);
        return value;
      },
      set: (newValue: any) => {
        if (newValue !== value) {
          this.setCallback && this.setCallback(newValue, value);
          value = newValue;
        }
      }
    });
  }
}