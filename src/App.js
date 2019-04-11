import React, { Component } from 'react';
import { PageHeader, SearchBox, ProductList } from './components';
import './App.css';
import products from "./data";

class App extends Component {
  state = {
    searchText: '',
    products: this.searchAndSortProducts()
  };

  onTextChange(searchText){
    this.setState({ searchText });
    this.setState({ products: this.searchAndSortProducts(searchText) });
  }

  searchAndSortProducts(text) {
    const filteredProducts = text ? products.filter(p => p.title.includes(text)) : products;
    filteredProducts.sort((a, b) => b.vote - a.vote);
    return filteredProducts;
  }

  handleVote(id, count) {
    products.find(p=>p.id === id).vote = count;
    this.setState({ products: this.searchAndSortProducts() });
  }

  render() {
    const { products, searchText } = this.state;
    return (
      <div className="container">
        <PageHeader title="Popular Products"/>
        <SearchBox text={ searchText } onTextChange={ (text) => this.onTextChange(text)} placeholder="Search products"/>
        <ProductList products={ products } onVote={ (id, vote)=> this.handleVote(id, vote) }/>
      </div>
    );
  }
}

export default App;
