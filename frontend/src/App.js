import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { logout } from './actions/userActions';
import './App.css';
import CartPage from './Pages/cartPage';
import HomePage from './Pages/homePage';
import OrderHistoryPage from './Pages/orderHistoryPage';
import OrderPage from './Pages/orderPage';
import PaymentPage from './Pages/paymentPage';
import PlaceOrderPage from './Pages/placeOrderPage';
import ProductPage from './Pages/productPage';
import ProductsPage from './Pages/productsPage';
import RegisterPage from './Pages/registerPage';
import ShippingPage from './Pages/shippingPage';
import SigninPage from './Pages/signInPage';

function App() {

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    const dispatch = useDispatch();

    const signoff = () => {
        dispatch(logout());
        closeMenu();
    }
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }

  return (
    <BrowserRouter>
    <div className="grid-container">
            <header className="header">
                <div className="brand">
                    <button onClick={openMenu}>
                        &#9776;
                    </button>
                    <Link to="/">Ganjee</Link>
                </div>
                <div className="header-links">
                    <Link to="/cart">
                        Cart
                        {cartItems.length > 0 && (
                            <span className="cartNotification">{cartItems.length}</span>
                        )}
                    </Link>
                    {(userInfo && userInfo.name != null) ?
                        (<div className="dropdown">
                            <Link to="#">{userInfo.name}<i className="fa fa-caret-down"></i>{' '}</Link>
                            <ul className="dropdown-content">
                                <li>
                                    <Link to="/" onClick={signoff}>Sign Out</Link>
                                </li>
                            </ul>
                        </div>)
                            :
                            <Link to="/signin">Sign In</Link>
                    }
                </div>
            </header>
            <aside className="sidebar">
                <h3>Shopping Categories</h3>
                <button className="sidebar-close-button" onClick={closeMenu}>x</button>
                <ul>
                    <li>
                        <Link to="/orderhistory">Order History</Link>
                    </li>
                    <li>
                        <a href="/products">Products</a>
                    </li>
                    <li>
                        <Link to="/" onClick={() => signoff()}>Sign Out</Link>
                    </li>
                </ul>
            </aside>
            <main className="main">
                <div className="content">
                    <Route path="/order/:id" component={OrderPage} />
                  <Route path="/placeorder" component={PlaceOrderPage} />
                  <Route path="/payment" component={PaymentPage} />
                  <Route path="/shipping" component={ShippingPage} />
                  <Route path="/signin" component={SigninPage} />
                  <Route path="/register" component={RegisterPage} />
                  <Route path="/product/:id" component={ProductPage} />
                  <Route path="/products" component={ProductsPage} />
                  <Route path="/cart/:id?" component={CartPage} />
                  <Route path="/orderhistory" component={OrderHistoryPage} />
                  <Route path="/" exact={true} component={HomePage} />
                </div>
            </main>
            <footer className="footer">
                All Rights Reserved
            </footer>
        </div>
        </BrowserRouter>
  );
}

export default App;
