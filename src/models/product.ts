// model class
export class Product {
  id: number;
  name: string;
  cost: number;
  quantity: number;

  // 생성자
  constructor(variables: Object = {}) {
    Object.assign(this, variables);
  }
}
