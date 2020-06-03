import products from '../mocks/products';

class ProductApi {
  getProducts = () => {
    return products;
  };

  addProduct = product => {
    return products.push(product);
  };

  deleteProduct = id => {
    const index = products.findIndex(product => product.id === id);
    if (index > -1) {
      products.splice(index, 1);
    }
  };

  updateProduct = product => {
    const { id } = product;
    const index = products.findIndex(product => product.id === id);
    if (index > -1) {
      products[index] = product;
    }
  };
}

export const productApi = new ProductApi();
