import React, { Component } from 'react';
import { PageHeader, SearchBox, ProductList } from './components';
import './App.css';
import products from "./data";

class App extends Component {
  state = {
    searchText: '',
    products: this.performSearchAndSort()
  };

  onTextChange(searchText){
    this.setState({ searchText });
    const products = this.performSearchAndSort(searchText, false);
    this.setState({ products });
  }

  performSearchAndSort(searchText = '', sort = true) {
    const filtered = searchText ? products.filter(p => p.title.includes(searchText)) : products;
    return sort ? filtered.sort((a, b) => b.vote - a.vote) : filtered;
  }

  handleVote(id, count) {
    products.find(p => p.id === id).vote = count;
    const filtered = this.performSearchAndSort(this.state.searchText);
    this.setState({ products: filtered });
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
