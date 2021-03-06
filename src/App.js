import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';
import { createStructuredSelector } from 'reselect';

import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import {
  auth,
  createUserProfileDocument,
  // addCollectionAndDocuments,
} from './firebase/firebase.utils';
import { selectCurrentUser } from './redux/user/user.selectors';

// import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = createUserProfileDocument(userAuth);

        (await userRef).onSnapshot((snapShot) => {
          setCurrentUser({ id: snapShot.id, ...snapShot.data() });
        });
      }
      //  else {
      setCurrentUser(userAuth);
      // addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})));
      // }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/checkout' component={CheckoutPage} />
        <Route
          path='/signin'
          render={() =>
            this.props.currentUser ? (
              <Redirect to='/' />
            ) : (
              <SignInAndSignUpPage />
            )
          }
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionsForPreview,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
