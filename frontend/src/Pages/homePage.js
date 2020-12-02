import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productsActions';
import SearchBox from './SearchBox';

function HomePage (props) {

    // const [products, setProduct] = useState([]);
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();
    const [searchField, setSearchField] = useState('');
    useEffect(() => { //runs when component rendered
        dispatch(listProducts());
        return () => {
            // cleanup
        };
    }, [dispatch])

    const _handleKeyDown = (e) => {

        if (e.key === 'Enter') {
          console.log('Entered: ' + e.target.value);
          setSearchField(e.target.value);
        }
    }

    return (
    loading? <div>Loading...</div> :
    error? <div>{error}</div> :
        <div>
        <SearchBox placeholder="Search Product" handleChange={_handleKeyDown}/>
        <ul className="products" >
            {
                products.map(product =>
                <li key={product._id}>
                    <div className="product">
                        <Link to={'/product/' + product._id} >
                            <img className="product-image" src={product.image} alt="product" />
                        </Link>
                        <div className="product-name">
                            <Link to={'/product/' + product._id} >{product.name}</Link>
                        </div>
                        <div className="product-brand">{product.brand}</div>
                        <div className="product-price">${product.price.toFixed(2)}</div>
                        {/* <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div> */}
                    </div>
                </li>
                )
            }

        </ul>
        </div>
    )
}

export default HomePage;