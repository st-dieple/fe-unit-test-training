type Discount = {
  percent: number;
  number: number;
};

export type Fruit = {
  id: string;
  name: string;
  price: number;
  number: number;
  discount: Discount[];
};

export class FruitList {
  fruitList: Fruit[] = [];

  constructor(data: Fruit[]) {
    this.fruitList = [...data];
  }

  getAllProducts() {
    return this.fruitList;
  }
  addProduct(fruit: Fruit) {
    if (fruit) {
      this.fruitList.push(fruit);
    } else {
      return 'Invalid param';
    }
  }
  getProduct(id: string) {
    if (id) {
      return this.fruitList.find((item: Fruit) => item.id === id);
    } else {
      return 'Invalid param';
    }
  }
  removeProduct(id: string) {
    if (id) {
      this.fruitList = this.fruitList.filter(
        (item: Fruit) => item.id !== id
      );
    } else {
      return 'Invalid param';
    }
  }
  updateProduct(product: Fruit) {
    if (product) {
      this.fruitList = this.fruitList.map((item: Fruit) => {
        if (item.id === product.id) {
          return product;
        }
        return item;
      });
    } else {
      return 'Invalid param';
    }
  }

  clearProductList() {
    this.fruitList = [];
  }

  countTotalPayment() {
    return this.fruitList.reduce((sum, product: Fruit) => {
      let discount = 0;
      product.discount.forEach((item: Discount) => {
        if (product.number >= item.number && item.percent > discount) {
          discount = item.percent;
        }
      });
      return sum + (product.price * product.number * (100 - discount)) / 100;
    }, 0);
  }
}
