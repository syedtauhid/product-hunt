import React, { Component } from 'react';
import { PageHeader, ProductList } from './components';
import { session, AuthContext } from './context/AuthContext';
import './App.css';
import products from "./data";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        session,
        logIn: this.logIn,
        logOut: this.logOut,
      },
      searchText: '',
      products: this.performSearchAndSort()
    };
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  logIn = (userName) => {
    session.authorized = true;
    session.userName = "tauhid";
    this.saveSession();
  }

  logOut = () => {
    session.authorized = false;
    session.userName = null;
    this.saveSession();
  }

  saveSession() {
    const user = this.state.user;
    this.setState({
      user: {
        ...user,
        session
      }
    });
  }

  onTextChange(searchText){
    this.setState({ searchText });
    const products = this.performSearchAndSort(searchText, false);
    this.setState({ products });
  }

  performSearchAndSort(searchText = '', sort = true) {
    const filtered = searchText ? products.filter(p => p.title.includes(searchText)) : products;
    return sort ? filtered.sort((a, b) => b.vote - a.vote) : filtered;
  }

  handleVote(id, increment) {
    const { user } = this.state;
    if(user.session.authorized) {
      const product = products.find(p => p.id === id);
      product.vote = increment ? ++product.vote : --product.vote;
      const filtered = this.performSearchAndSort(this.state.searchText);
      this.setState({ products: filtered });
    }
  }

  render() {
    const { products, searchText } = this.state;
    return (
      <AuthContext.Provider value={ this.state.user }>
        <PageHeader logoText="Product Hunt" searchText={ searchText } onTextChange={ this.onTextChange }/>
        <div className="container">
          <ProductList products={ products } onVote={ this.handleVote }/>
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
