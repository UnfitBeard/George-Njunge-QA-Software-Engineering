import { parseValue0 } from "./exerciseUnionsLiteralsNarrowing.ts"; // Import your function

describe("parseValue function", () => {
  test('Should error when anything else is passed in', () => {
    expect(() => parseValue0('123')).toThrow('Parsing error!')
    expect(() => parseValue0(123)).toThrow('Parsing error!')
  })
});


