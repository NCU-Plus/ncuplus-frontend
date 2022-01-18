function add(x: number, y: number): number {
  return x + y;
}

describe("jest envirment test", () => {
  test("1 + 1 = 2", () => {
    expect(add(1, 1)).toBe(2);
  });
});
