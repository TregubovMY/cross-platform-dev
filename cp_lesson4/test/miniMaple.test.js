import {MiniMaple} from "../src/miniMaple";

describe('MiniMaple', () => {
  describe('when use unsupported operation', () => {
    it('', () => { expect(() => new MiniMaple('x/2', 'x')).toThrow('Invalid expression'); });
    it('', () => { expect(() => new MiniMaple('x:2', 'x')).toThrow('Invalid expression'); });
  });

  describe('when success diff', () => {
    it('', () => { expect(new MiniMaple('4*x^3').diff('x')).toStrictEqual(new MiniMaple('12*x^2')); });

    it('', () => { expect(new MiniMaple('4*x^3').diff('y')).toStrictEqual(new MiniMaple('0')); });

    it('', () => { expect(new MiniMaple('4*x^3-x^2').diff('x')).toStrictEqual(new MiniMaple('12*x^2 - 2*x')); });

    it('', () => { expect(new MiniMaple('x^3-x').diff('x')).toStrictEqual(new MiniMaple('3*x^2 - 1')); });

    it('', () => { expect(new MiniMaple('x^3+x+6').diff('x')).toStrictEqual(new MiniMaple('3*x^2 + 1')); });

    it('', () => { expect(new MiniMaple('-x^3+x+6').diff('x')).toStrictEqual(new MiniMaple('-3*x^2 + 1')); });
  });
});
