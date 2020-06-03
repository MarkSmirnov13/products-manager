import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, CardText, CardBody, CardTitle, ListGroup, ListGroupItem, Button } from 'reactstrap';
import moment from 'moment';

import { deleteProduct as deleteProductAction } from '../../store/actions/products';

import './Product.css';

const shortDateFormat = 'MM/DD/YYYY';
const longDateFormat = 'MM/DD/YYYY hh:mm a';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const receiptDate = product.receiptDate
    ? moment(product.receiptDate).format(shortDateFormat)
    : '-';
  const expirationDate = product.expirationDate
    ? moment(product.expirationDate).format(shortDateFormat)
    : '-';
  const createdAt = product.createdAt ? moment(product.createdAt).format(longDateFormat) : '-';

  const deleteProduct = id => {
    dispatch(deleteProductAction(id));
  };

  return (
    <Card className='Product'>
      <CardBody>
        <CardTitle>{product.name}</CardTitle>
        <CardText tag='div'>
          <ListGroup>
            <ListGroupItem>Brand: {product.brand}</ListGroupItem>
            <ListGroupItem>Rating: {product.rating}</ListGroupItem>
            <ListGroupItem>Featured: {product.featured ? 'Yes' : 'No'}</ListGroupItem>
            <ListGroupItem>Items In Stock: {product.itemsInStock}</ListGroupItem>
            <ListGroupItem>
              Categories:
              <ul>
                {product.categories.map(category => (
                  <li key={category.id}>{category.name}</li>
                ))}
              </ul>
            </ListGroupItem>
            <ListGroupItem>Receipt Date: {receiptDate}</ListGroupItem>
            <ListGroupItem>Expiration Date: {expirationDate}</ListGroupItem>
            <ListGroupItem>Created At: {createdAt}</ListGroupItem>
          </ListGroup>
        </CardText>
        <Link to={`/update/${product.id}`} className='btn btn-primary'>
          Update
        </Link>
        <Button color='danger' onClick={() => deleteProduct(product.id)}>
          Delete
        </Button>
      </CardBody>
    </Card>
  );
};

Product.propTypes = {
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
    categories: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    expirationDate: PropTypes.string
  }).isRequired
};

export default Product;
