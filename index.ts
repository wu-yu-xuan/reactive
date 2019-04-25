import Observer from "./Observer";

/**
 * 因为`value`上添加`get`函数后, 解释器就不会去尝试自动执行, 以免有副作用, 所以打印结果就可能是`[Object Object]`
 * 使用`JSON.stringify`可以执行`value`的`get`函数, 并把`value`打印出来
 */
function getCallback(value: any) {
  console.log(`get value: ${JSON.stringify(value)}`);
}

function setCallback(newValue: any, value: any) {
  console.log(`set value: ${JSON.stringify(value)} -> ${JSON.stringify(newValue)}`);
}

const obj = { a: { b: [{ c: 1 }] } };

new Observer(obj, { getCallback, setCallback });

obj.a.b[0].c = 2;
obj.a.b.push({ c: 3 });
obj.a.b[1].c = 4;

/**
 * result:
 * get value: {"b":[{"c":1}]}
 * get value: [{"c":1}]
 * get value: 1
 * get value: 1
 * get value: [{"c":1}]
 * get value: 1
 * get value: {"b":[{"c":1}]}
 * get value: 1
 * get value: [{"c":1}]
 * set value: 1 -> 2
 * get value: 2
 * get value: [{"c":2}]
 * get value: 2
 * get value: {"b":[{"c":2}]}
 * get value: 2
 * get value: [{"c":2}]
 * get value: 3
 * get value: 2
 * get value: 2
 * get value: 3
 * set value: [{"c":2}] -> [{"c":2},{"c":3}]
 * get value: 2
 * get value: 3
 * get value: [{"c":2},{"c":3}]
 * get value: 2
 * get value: 3
 * get value: {"b":[{"c":2},{"c":3}]}
 * get value: 2
 * get value: 3
 * get value: [{"c":2},{"c":3}]
 * set value: 3 -> 4
 */