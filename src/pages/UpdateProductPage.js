import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Form from '../components/Form/Form';
import { fetchProducts } from '../store/actions/products';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const UpdateProductPage = ({
  match: {
    params: { id }
  }
}) => {
  const dispatch = useDispatch();
  const productId = Number(id);
  const product = useSelector(state => {
    if (state.products.length === 0) {
      dispatch(fetchProducts());
    }

    return state.products.filter(product => product.id === productId);
  });

  return product.length > 0 ? (
    <>
      <Header name='Update product' />
      <Form product={product[0]} type='updateProduct' />
      <Footer />
    </>
  ) : (
    'Product Not Found'
  );
};

export default UpdateProductPage;
