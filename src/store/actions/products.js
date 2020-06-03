import { productApi } from '../../gateways/ProductApi';

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

const requestProducts = () => ({
  type: REQUEST_PRODUCTS
});

const receiveProducts = json => ({
  type: RECEIVE_PRODUCTS,
  products: json.map(product => product)
});

export const addProductProperties = product => ({
  type: ADD_PRODUCT,
  product
});

export const addProduct = product => dispatch => {
  dispatch(addProductProperties(product));
  productApi.addProduct(product);
};

export const fetchProducts = () => dispatch => {
  dispatch(requestProducts());
  const json = productApi.getProducts();
  dispatch(receiveProducts(json));
};

export const deleteProductProperties = id => ({
  type: DELETE_PRODUCT,
  productId: id
});

export const deleteProduct = id => dispatch => {
  dispatch(deleteProductProperties(id));
  productApi.deleteProduct(id);
};

export const updateProductProperties = product => ({
  type: UPDATE_PRODUCT,
  product
});

export const updateProduct = product => dispatch => {
  dispatch(updateProductProperties(product));
  productApi.updateProduct(product);
};
