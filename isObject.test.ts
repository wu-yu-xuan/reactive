import isObject from './isObject';

describe('something is object or not', () => {
  test('object is object', () => {
    expect(isObject({})).toBeTruthy();
    expect(isObject(Object.prototype)).toBeTruthy();
  });
  test('array is object', (...args) => {
    expect(isObject([])).toBeTruthy();
    expect(isObject(args)).toBeTruthy();
    expect(isObject(Array.prototype)).toBeTruthy();
  });
  test('null is not object', () => {
    expect(isObject(null)).toBeFalsy();
  });
  test('undefined is not object', () => {
    expect(isObject(undefined)).toBeFalsy();
  });
  test('number is not object', () => {
    expect(isObject(Math.random())).toBeFalsy();
    expect(isObject(Math.PI)).toBeFalsy();
    expect(isObject(Math.max())).toBeFalsy();
    expect(isObject(NaN)).toBeFalsy();
  });
  test('string is not object', () => {
    expect(isObject('')).toBeFalsy();
    expect(isObject(Math.random().toString())).toBeFalsy();
  });
  test('symbol is not object', () => {
    expect(isObject(Symbol())).toBeFalsy();
  });
  test('boolen is not object', () => {
    expect(isObject(true)).toBeFalsy();
    expect(isObject(false)).toBeFalsy();
  });
  test('function is not object', () => {
    expect(isObject(Object.keys)).toBeFalsy();
    expect(isObject(Array.prototype.map)).toBeFalsy();
  });
});
