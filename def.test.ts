import def from "./def";

test('use def to ensure the key to add is not enumerable', () => {
  const obj = { a: 1 };
  def(obj, 'b', 2);
  def(obj, Array.prototype.map.name, Array.prototype.map);
  const sName = 'symbol';
  def(obj, sName, Symbol.for(sName));
  expect(Object.keys(obj).length).toBe(1);
});