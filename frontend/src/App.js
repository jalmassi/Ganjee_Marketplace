import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { logout } from './actions/userActions';
import './App.css';
import CartScreen from './Pages/CartScreen';
import HomeScreen from './Pages/HomeScreen';
import OrderScreen from './Pages/OrderScreen';
import PaymentScreen from './Pages/PaymentScreen';
import PlaceOrderScreen from './Pages/PlaceOrderScreen';
import ProductScreen from './Pages/ProductScreen';
import ProductsScreen from './Pages/ProductsScreen';
import RegisterScreen from './Pages/registerScreen';
import ShippingScreen from './Pages/ShippingScreen';
import SigninScreen from './Pages/SigninScreen';

function App() {

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

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
                    <a href="/cart">Cart</a>
                    {(userInfo && userInfo.name != null) ? <Link to="/profile">{userInfo.name}</Link> :
                    <Link to="/signin">Sign In</Link>}

                </div>
            </header>
            <aside className="sidebar">
                <h3>Shopping Categories</h3>
                <button className="sidebar-close-button" onClick={closeMenu}>x</button>
                <ul>
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
                    <Route path="/order/:id" component={OrderScreen} />
                  <Route path="/placeorder" component={PlaceOrderScreen} />
                  <Route path="/payment" component={PaymentScreen} />
                  <Route path="/shipping" component={ShippingScreen} />
                  <Route path="/signin" component={SigninScreen} />
                  <Route path="/register" component={RegisterScreen} />
                  <Route path="/product/:id" component={ProductScreen} />
                  <Route path="/products" component={ProductsScreen} />
                  <Route path="/cart/:id?" component={CartScreen} />
                  <Route path="/" exact={true} component={HomeScreen} />
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
