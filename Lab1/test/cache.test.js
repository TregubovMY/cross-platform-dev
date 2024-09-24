import {Cache} from "../src/cache";

const data = {
  'key1': {
    value: 'some value',
    quantity: 2 
  },
  'key2': {
    value: 'some',
    quantity: 1
  },
  'key3': {
    value: 'some',
  },
  'key4': {}
}

let cache;

beforeEach(() => {
  cache = new Cache(data);
})

afterEach(() => {
  cache = null
})

describe('Cache', () => {
  describe('value', () => {
    test('get value', () => {
      expect(cache.value('key1')).toEqual(data['key1'].value)
    })

    test('quantity decreasing after request', () => {
      cache.value('key2')
      expect(cache.value('key2')).toEqual(null)
    })

    test('returns null when the quantity is not set', () => {
      cache.value('key3');
      expect(cache.value('key3')).toEqual(null);
    });

    test('returns null when the key is not found', () => {
      expect(cache.value('key4')).toEqual(null);
    });
  });

  describe('log', () => {
    test('returns an empty string when no logs have been made', () => {
      expect(cache.log).toEqual('');
    });

    test('returns the correct log entries', () => {
      cache.value('key1');
      cache.value('key2');

      expect(cache.log).toEqual(
        "key1: some value, quantity: 2\nkey2: some, quantity: 1"
      );
    });
  });

  describe('setQuantity', () => {
    it('should set quantity for existing key', () => {
      cache.setQuantity('key1', 5);
      expect(cache.__data.key1.quantity).toBe(5);
    });

    it('should throw error for non-existent key', () => {
      expect(() => cache.setQuantity('key99', 5)).toThrowError('Key not found in cache or value is null');
    });

    it('should throw error for key with null value', () => {
      expect(() => cache.setQuantity('key5', 5)).toThrowError('Key not found in cache or value is null');
    });
  });

  describe('add', () => {
    it('should add new key-value pair', () => {
      cache.add({ key8: { value: 'value4', quantity: 1 } });
      expect(cache.__data.key8).toEqual({ value: 'value4', quantity: 1 });
    });

    it('should merge existing key-value pair', () => {
      cache.add({ key6: { value: 'value5', quantity: 1 } });
      cache.add({ key6: { value: 'newValue5', quantity: 2 } });
      expect(cache.__data.key6).toEqual({ value: 'newValue5', quantity: 2 });
    });

    it('should normalize data before adding', () => {
      cache.add({ key6: { value: 'value6' } });
      expect(cache.__data.key6).toEqual({ value: 'value6', quantity: 1 });
    });
  });
});
