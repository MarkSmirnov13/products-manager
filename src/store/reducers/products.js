import * as productsActions from '../actions/products';

export function products(state = [], action) {
  switch (action.type) {
    case productsActions.RECEIVE_PRODUCTS:
      return [
        ...action.products
      ];
    case productsActions.ADD_PRODUCT:
      return [
        ...state,
        action.product
      ];
    case productsActions.DELETE_PRODUCT:
      return [
        ...state.filter(product => product.id !== action.productId)
      ];
    case productsActions.UPDATE_PRODUCT: {
      const { id } = action.product;
      const index = state.findIndex(product => product.id === id);
      state[index] = action.product;
      return [
        ...state
      ];
    }
    default:
      return state;
  }
}
