import React, { Component } from "react";
import { PageHeader, ProductList, Modal, LoginWiget } from "./components";
import { session, AuthContext } from "./contexts/AuthContext";
import "./App.css";
import products from "./data";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        session,
        openLoginModal: this.openLoginModal,
        logOut: this.logOut
      },
      userLogin: {
        userName: "",
        password: ""
      },
      showLoginModal: false,
      searchText: "",
      products: this.performSearchAndSort()
    };
  }

  openLoginModal = () => {
    this.setState({ showLoginModal: true });
  };

  logIn = userName => {
    session.authorized = true;
    session.userName = userName;
    this.saveSession();
  };

  logOut = () => {
    session.authorized = false;
    session.userName = null;
    this.saveSession();
  };

  saveSession() {
    const user = this.state.user;
    this.setState({
      user: {
        ...user,
        session
      }
    });
  }

  onUserLoginChange = (value, path) => {
    const { userLogin } = this.state;
    userLogin[path] = value;
    this.setState({ userLogin });
  };

  logInAndCloseModal = () => {
    this.logIn(this.state.userLogin.userName);
    this.closeModal();
  };

  closeModal = () => {
    this.setState({
      showLoginModal: false,
      userLogin: {
        userName: "",
        password: ""
      }
    });
  };

  onSearchTextChange = searchText => {
    this.setState({ searchText });
    const products = this.performSearchAndSort(searchText, false);
    this.setState({ products });
  };

  performSearchAndSort(searchText = "", sort = true) {
    const filtered = searchText
      ? products.filter(p => p.title.includes(searchText))
      : products;
    return sort ? filtered.sort((a, b) => b.vote - a.vote) : filtered;
  }

  handleVote = (id, increment) => {
    const { user } = this.state;
    if (user.session.authorized) {
      const product = products.find(p => p.id === id);
      product.vote = increment ? ++product.vote : --product.vote;
      const filtered = this.performSearchAndSort(this.state.searchText);
      this.setState({ products: filtered });
    } else {
      this.setState({ showLoginModal: true });
    }
  };

  render() {
    const { products, searchText, showLoginModal, userLogin } = this.state;

    return (
      <React.Fragment>
        <AuthContext.Provider value={this.state.user}>
          <PageHeader
            logoText="Product Hunt"
            searchText={searchText}
            onTextChange={this.onSearchTextChange}
          />
          <div className="container">
            <ProductList products={products} onVote={this.handleVote} />
          </div>
        </AuthContext.Provider>
        {showLoginModal && (
          <Modal
            modalTitle="Login to upvote"
            showSaveBtn
            saveBtnText="Login"
            disableSaveBtn={!userLogin.userName || !userLogin.password}
            onSave={this.logInAndCloseModal}
            onClose={this.closeModal}
          >
            <LoginWiget
              userLogin={userLogin}
              onChange={this.onUserLoginChange}
            />
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

export default App;
