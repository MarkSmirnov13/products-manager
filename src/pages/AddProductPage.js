import React from 'react';

import Form from '../components/Form/Form';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const AddProductPage = () => {
  return (
    <>
      <Header name='Add product' />
      <Form type='addProduct' />
      <Footer />
    </>
  );
};

export default AddProductPage;
