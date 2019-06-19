import React, { Component } from 'react';
import { PageHeader, ProductList, Modal } from './components';
import { session, AuthContext } from './context/AuthContext';
import './App.css';
import products from "./data";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        session,
        openLoginModal: this.openLoginModal,
        logOut: this.logOut,
      },
      showLoginModal: false,
      searchText: '',
      products: this.performSearchAndSort()
    };
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  openLoginModal = () => {
    this.setState({ showLoginModal: true });
  }

  logIn = () => {
    session.authorized = true;
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

  logInAndCloseModal = () => {
    this.logIn();
    this.closeModal();
  }

  closeModal = () => {
    this.setState({
      showLoginModal: false
    })
  }

  onSearchTextChange(searchText){
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
    } else {
      this.setState({showLoginModal: true})
    }
  }

  render() {
    const { products, searchText, showLoginModal } = this.state;

    return (
      <React.Fragment>
        <AuthContext.Provider value={ this.state.user }>
        <PageHeader logoText="Product Hunt" searchText={ searchText } onTextChange={ this.onSearchTextChange }/>
        <div className="container">
          <ProductList products={ products } onVote={ this.handleVote }/>
        </div>
      </AuthContext.Provider>
      {
        showLoginModal && 
          <Modal 
            modalTitle="Login to upvote"
            showSaveBtn
            saveBtnText="Login"
            onSave={ this.logInAndCloseModal }
            onClose={ this.closeModal }
            >
            <form>
              <div class="form-group">
                <label for="email">User name:</label>
                <input type="text" class="form-control" placeholder="Enter user name" />
              </div>
              <div class="form-group">
                <label for="pwd">Password:</label>
                <input type="password" class="form-control" id="pwd" placeholder="Enter password" />
              </div>
            </form>
          </Modal>
      }
      </React.Fragment>
    );
  }
}

export default App;
