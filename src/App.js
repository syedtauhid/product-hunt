import React, { Component } from 'react';
import { PageHeader, SearchBox } from './components';
import './App.css';
import products from "./data";

class App extends Component {
  state = {
    searchText: '',
    products
  };

  onTextChange(searchText){
    this.setState({ searchText });
    this.searchProducts(searchText);
  }

  searchProducts(text) {
    const { products } = this.state;
    products.find()
  }

  render() {
    const { products, searchText } = this.state;
    return (
      <div className="container">
        <PageHeader title="Popular Products"/>
        <SearchBox text={ searchText } onTextChange={(text) => this.onTextChange(text)} placeholder="Search products"/>
        <ProductList products={ products }/>
      </div>
    );
  }
}

export default App;
