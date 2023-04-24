import { FruitList, Fruit } from './fruitStore.model';

const data: Fruit = {
  id: '1',
  name: 'apple',
  price: 1000,
  number: 1,
  discount: [
    {
      percent: 5,
      number: 1,
    },
    {
      percent: 10,
      number: 2,
    },
  ],
};

const data2: Fruit = {
  id: '2',
  name: 'apple',
  price: 1000,
  number: 2,
  discount: [
    {
      percent: 5,
      number: 1,
    },
    {
      percent: 10,
      number: 2,
    },
  ],
};

const data3: Fruit = {
  id: '3',
  name: 'apple',
  price: 100,
  number: 2,
  discount: [
    {
      percent: 5,
      number: 1,
    },
    {
      percent: 10,
      number: 2,
    },
  ],
};

const dataUpdate: Fruit = {
  id: '1',
  name: 'apple Gala',
  price: 10000,
  number: 10,
  discount: [
    {
      percent: 3,
      number: 2,
    },
    {
      percent: 5,
      number: 4,
    },
  ],
};
describe('test product order', () => {
  const error = 'Invalid param';
  let order;
  beforeEach(() => {
    order = new FruitList([]);
  });
  afterEach(() => {
    order.clearProductList();
  });
  describe('add product method', () => {
    it('should add product successfully', () => {
      order.addProduct(data);
      expect(order.getProductList()).toHaveLength(1);
      expect(order.productList).toContainEqual(data);
    });
    it('should return error with invalid param', () => {
      expect(order.addProduct(null)).toMatch(error);
      expect(order.addProduct(undefined)).toMatch(error);
    });
  });

  describe('get product method', () => {
    it('should get product successfully', () => {
      order.addProduct(data);
      const product = order.getProduct('1');
      expect(product).toEqual(data);
    });
    it('should return error with invalid param', () => {
      expect(order.getProduct(null)).toMatch(error);
      expect(order.getProduct(undefined)).toMatch(error);
    });
  });

  describe('remove product method', () => {
    it('should remove product successfully', () => {
      order.addProduct(data);
      order.removeProduct('1');
      expect(order.productList).toEqual([]);
    });
    it('should return error with invalid param', () => {
      expect(order.removeProduct(null)).toMatch(error);
      expect(order.removeProduct(undefined)).toMatch(error);
    });
  });

  describe('update product method', () => {
    it('should update product successfully', () => {
      order.addProduct(data);
      order.updateProduct(dataUpdate);
      expect(order.productList).toEqual([dataUpdate]);
    });
    it('should return error with invalid param', () => {
      expect(order.updateProduct(null)).toMatch(error);
      expect(order.updateProduct(undefined)).toMatch(error);
    });
  });

  describe('countTotalPayment method', () => {
    it('should return total = 0 in case empty product list', () => {
      expect(order.countTotalPayment()).toEqual(0);
    });
    it('should count total payment correctly', () => {
      order.addProduct(data);
      expect(order.countTotalPayment()).toEqual(950);
      order.addProduct(data2);
      expect(order.countTotalPayment()).toEqual(2750);
      order.addProduct(data3);
      expect(order.countTotalPayment()).toEqual(2930);
    });
  });
});
