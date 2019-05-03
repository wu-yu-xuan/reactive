import Observer from './Observer';

/**
 * Observer 真难写测试...
 * 尝试了几遍之后, 就用这种简易的凑合一下吧:)
 */
describe('Observer should works well', () => {
  const getCallback = jest.fn((value: any) => 0);
  const setCallback = jest.fn((newValue: any, value: any) => 0);
  beforeEach(() => {
    getCallback.mockReset();
    setCallback.mockReset();
  });
  const reactiveObj = { a: { b: [{ c: 1 }] } };
  it('may call get when being reactive', () => {
    new Observer(reactiveObj, { getCallback, setCallback });
    expect(getCallback.mock.calls.length).toBe(3);
  });
  it('works when modifying existed value', () => {
    reactiveObj.a.b[0].c = 2;
    expect(getCallback.mock.calls.length).toBe(2);
    expect(setCallback.mock.calls.length).toBe(1);
  });
  it('works when adding new value', () => {
    reactiveObj.a.b.push({ c: 3 });
    expect(getCallback.mock.calls.length).toBe(3);
    expect(setCallback.mock.calls.length).toBe(1);
  });
  it('works when modifying added value', () => {
    reactiveObj.a.b[1].c = 2;
    expect(getCallback.mock.calls.length).toBe(2);
    expect(setCallback.mock.calls.length).toBe(1);
  });
});