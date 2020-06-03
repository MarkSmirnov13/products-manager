import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { chunk } from 'lodash';
import Product from '../Product/Product';

const ProductList = ({ products }) => {
  const productsGroups = chunk(products, 3);

  return (
    <Container>
      {productsGroups.map((productsGroup, index) => (
        <Row key={products[index].id} className='mb-5'>
          {productsGroup.map(product => (
            <Col sm='4' key={product.id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ProductList;
