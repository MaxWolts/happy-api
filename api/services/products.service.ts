import boom from "@hapi/boom";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string[];
}

const example: Product[] = [
  {
    id: "1",
    name: "a",
    price: 12,
    description: "aaa",
    image: "as",
    category: ["dd"],
  },
  {
    id: "2",
    name: "a",
    price: 12,
    description: "aaa",
    image: "as",
    category: ["dd"],
  },
];

export class ProductsService {
  products: Product[];
  constructor() {
    this.products = example;
  }
  async create() {}
  async find() {
    return this.products;
  }
  async findOne(id: string) {
    const product = this.products.filter((product) => product.id === id);
    if (product.length) {
      return product;
    } else {
      console.log('u');

      throw boom.notFound("product not found");
    }
  }
  async update() {}
  async delete() {}
}
