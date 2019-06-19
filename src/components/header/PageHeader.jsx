import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBox from './SearchBox';
import { AuthContext } from '../../context/AuthContext';

class PageHeader extends Component {
    render() {
        const { logoText, searchText, onTextChange } = this.props;
        const { session, openLoginModal, logOut } = this.context;
        return (
            <nav className="navbar navbar-expand-sm bg-primary navbar-dark sticky-top">
                <a className="navbar-brand font-weight-bolder" href="#"><i className="fab fa-product-hunt"></i> { logoText }</a>
                <SearchBox searchText={ searchText } onTextChange={ onTextChange } placeholder="Search products"/>
                {
                    session.authorized ?
                    <div className="text-white ml-auto">
                        Welcome <strong>{ session.userName }</strong>
                        <button type="button" onClick={ logOut } className="btn text-white ml-auto">
                            <i className="fas fa-sign-in-alt"></i> Log out
                        </button>
                    </div>
                    :
                    <button type="button" onClick={ openLoginModal } className="btn text-white ml-auto">
                        <i className="fas fa-sign-in-alt"></i> Sign in
                    </button>
                }
            </nav>
        )
    }
}

PageHeader.propTypes = {
    logoText: PropTypes.string,
    searchText: PropTypes.string,
    onTextChange: PropTypes.func,
}

PageHeader.contextType = AuthContext;

export default PageHeader;