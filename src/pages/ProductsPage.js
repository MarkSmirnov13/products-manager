import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import ProductsList from '../components/ProductsList/ProductsList';
import { fetchCategories } from '../store/actions/categories';
import { fetchProducts } from '../store/actions/products';
import { getCategoriesById } from '../store/reducers/categories';
import Footer from '../components/Footer/Footer';

class ProductsPage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }

  render() {
    const { products } = this.props;

    return (
      <>
        <Header name='Products' />
        <Link to='/add'>Add product</Link>
        <ProductsList products={products} />
        <Footer />
      </>
    );
  }
}

ProductsPage.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const categoriesById = getCategoriesById(state);

  const products = state.products.map(product => {
    const categories = product.categories.map(id => categoriesById[id]);

    return {
      ...product,
      categories
    };
  });

  return {
    products
  };
};

export default connect(mapStateToProps)(ProductsPage);
