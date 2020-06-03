export const ADD_PRODUCT = 'addProduct';
export const UPDATE_PRODUCT = 'updateProduct';

export const defaultProduct = {
  name: '',
  rating: '',
  featured: false,
  itemsInStock: '',
  receiptDate: '',
  brand: '',
  categories: [],
  expirationDate: ''
};

export const getValidationDefaultState = (isUpdateProduct, expirationDate) => ({
  productIsValid: {
    name: isUpdateProduct,
    rating: isUpdateProduct,
    featured: true,
    categories: isUpdateProduct,
    expirationDate:
      isUpdateProduct && expirationDate
        ? getExpirationDate(new Date(expirationDate), new Date()) >= 30
        : true
  },
  formIsValid: false
});

export const generateId = () => Math.floor(Math.random() * 100000);

export const getExpirationDate = (date, nowDate) =>
  Math.ceil((date.getTime() - nowDate.getTime()) / (1000 * 3600 * 24)) - 1;

export const checkForm = productIsValid =>
  Object.keys(productIsValid).every(product => productIsValid[product]);

export const addValidationToForm = (name, isValid) => {
  const element = document.getElementById(name);

  if (isValid) {
    element.classList.remove('is-invalid');
    element.classList.add('is-valid');
  } else {
    element.classList.remove('is-valid');
    element.classList.add('is-invalid');
  }
};

export const getDefaultSelectionValue = (categories, productState, type) => {
  const state = [];
  if (type === UPDATE_PRODUCT) {
    categories.forEach(category => {
      if (productState.categories.indexOf(category.id) !== -1) {
        state.push(category.id)
      }
    });

    return state;
  }

  return state;
};
