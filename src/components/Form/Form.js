import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Form as FormBase, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

import {
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  defaultProduct,
  generateId,
  getValidationDefaultState,
  getExpirationDate,
  checkForm,
  addValidationToForm,
  getDefaultSelectionValue
} from './Form.utils';
import { addProduct, updateProduct } from '../../store/actions/products';
import { fetchCategories } from '../../store/actions/categories';

const Form = ({ type, product, history }) => {
  const isUpdateProduct = type === UPDATE_PRODUCT;
  const validationDefaultState = getValidationDefaultState(isUpdateProduct, product && product.expirationDate);
  const dispatch = useDispatch();
  const categories = useSelector(state => {
    if (state.categories.length === 0) {
      dispatch(fetchCategories());
    }
    return state.categories;
  });
  const [productState, setProductState] = useState(type === ADD_PRODUCT ? defaultProduct : product);
  const [validationState, setValidationState] = useState(validationDefaultState);

  useEffect(() => {
    validateForm();
  }, [validationState]);

  const validateForm = () => {
    setValidationState(state => ({ ...state, formIsValid: checkForm(state.productIsValid) }));
  };

  const validate = (fieldName, propIsValid, additionalProp = {}) => {
    setValidationState(state => ({
      ...state,
      productIsValid: { ...state.productIsValid, [fieldName]: propIsValid, additionalProp }
    }));

    addValidationToForm(fieldName, propIsValid);
  };

  const validateField = (fieldName, fieldValue) => {
    switch (fieldName) {
      case 'name': {
        const nameIsValid = fieldValue.length > 0 && fieldValue.length <= 200;
        validate(fieldName, nameIsValid);
        break;
      }
      case 'rating': {
        const correctRating = Number(fieldValue);
        const ratingIsValid =
          correctRating && correctRating <= 10 && correctRating > 0 && Number.isInteger(correctRating);

        if (correctRating > 8 && !productState.featured) {
          setProductState(state => ({ ...state, featured: true }));
        } else if (correctRating <= 8) {
          const featuredElement = document.getElementById('featured');
          featuredElement.classList.remove('is-invalid');
        }

        validate(fieldName, ratingIsValid, { featured: true });
        break;
      }
      case 'featured': {
        const featuredIsValid = Number(productState.rating) > 8 ? fieldValue : true;
        validate(fieldName, featuredIsValid);
        break;
      }
      case 'categories': {
        const categoriesAreValid = fieldValue.length > 0 && fieldValue.length < 5;
        validate(fieldName, categoriesAreValid);
        break;
      }
      case 'expirationDate': {
        const date = new Date(fieldValue);
        const nowDate = new Date();
        const expirationDateIsValid = fieldValue ? getExpirationDate(date, nowDate) >= 30 : true;
        validate(fieldName, expirationDateIsValid);
        break;
      }
      default:
        break;
    }
  };

  const handleInputChange = e => {
    const { target } = e;
    const { name } = target;
    let value;

    if (target.options) {
      const { options } = target;
      value = [];

      for (let i = 0; i < options.length; i += 1) {
        if (options[i].selected) {
          value.push(Number(options[i].value));
        }
      }
    } else {
      value = target.type === 'checkbox' ? target.checked
        : target.type === 'number' ? Number(target.value) : target.value;
    }

    setProductState(state => ({ ...state, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!validationState.formIsValid) {
      Object.keys(productState).forEach(productProp =>
        validateField(productProp, productState[productProp])
      );

      if (!validationState.formIsValid) {
        return;
      }
    }

    if (type === ADD_PRODUCT) {
      dispatch(
        addProduct({ ...productState, id: generateId(), createdAt: new Date().toISOString() })
      );
    } else {
      dispatch(updateProduct(productState));
    }

    history.push('/');
  };

  return (
    <FormBase onSubmit={handleSubmit}>
      <FormGroup>
        <Label for='name'>Name</Label>
        <Input
          type='text'
          name='name'
          id='name'
          placeholder='product name'
          value={productState.name}
          onChange={handleInputChange}
        />
        <FormFeedback>Name is required, length not greater than 200</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for='brand'>Brand</Label>
        <Input
          type='text'
          name='brand'
          id='brand'
          placeholder='product brand'
          value={productState.brand}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for='rating'>Rating</Label>
        <Input
          type='number'
          name='rating'
          id='rating'
          placeholder='product rating'
          value={productState.rating}
          onChange={handleInputChange}
        />
        <FormFeedback>Rating is required and must be integer and not greater than 10</FormFeedback>
      </FormGroup>
      <FormGroup check>
        <Label for='featured' check>
          <Input
            type='checkbox'
            name='featured'
            id='featured'
            checked={productState.featured}
            onChange={handleInputChange}
          />
          Featured
          <FormFeedback>Product with rating greater than 8 must be “featured”</FormFeedback>
        </Label>
      </FormGroup>
      <FormGroup>
        <Label for='itemsInStock'>Items In Stock</Label>
        <Input
          type='number'
          name='itemsInStock'
          id='itemsInStock'
          placeholder='items in stock'
          value={productState.itemsInStock}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for='categories'>Categories</Label>
        <Input
          type='select'
          id='categories'
          name='categories'
          defaultValue={getDefaultSelectionValue(categories, productState, type)}
          onChange={handleInputChange}
          multiple
        >
          {
            categories && categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))
          }
        </Input>
        <FormFeedback>Product should have from 1 to 5 categories</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for='receiptDate'>Receipt Date</Label>
        <Input
          type='date'
          name='receiptDate'
          id='receiptDate'
          placeholder='receipt date'
          value={productState.receiptDate}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for='expirationDate'>Expiration Date</Label>
        <Input
          type='date'
          name='expirationDate'
          id='expirationDate'
          placeholder='expiration date'
          value={productState.expirationDate}
          onChange={handleInputChange}
        />
        <FormFeedback>Expiration date should expire not less than 30 days since now</FormFeedback>
      </FormGroup>
      <Button type='submit'>{type === ADD_PRODUCT ? 'Add' : 'Save'}</Button>
    </FormBase>
  );
};

Form.propTypes = {
  type: PropTypes.string.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    featured: PropTypes.bool.isRequired,
    itemsInStock: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    receiptDate: PropTypes.string,
    brand: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    expirationDate: PropTypes.string
  }),
  history: PropTypes.object.isRequired
};

export default withRouter(Form);
