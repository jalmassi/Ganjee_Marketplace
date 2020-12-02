import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productsActions';

export default function ProductPage (props) {

    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const {product, loading, error} = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            //
        }
    }, [props, dispatch])

    const handleAddToCart = () => {
        props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
      };

    return <div>
        <div className="back-to-result">
            <Link to="/">Back to result</Link>
        </div>
        {loading? <div>Loading...</div> :
        error? <div>{error}</div> :
        (
        <div className="details">
            <div className="details-image">
                <img src={product.image} alt="product" ></img>
            </div>
            <div className="details-info">
                <ul>
                    <li>
                        <h2>
                            {product.name}
                        </h2>
                    </li>
                    {/* <li>
                        <h4>
                            {product.rating} Stars ({product.numReviews} Reviews)
                        </h4>
                    </li> */}
                    <li>
                        <p>
                            Price: <strong>${product.price}</strong>
                        </p>
                    </li>
                    <li>
                        <p>
                            Description: <strong>{product.description}</strong>
                        </p>
                    </li>
                </ul>
                </div>
                <div className="details-action">
                    <ul>
                        <li>
                            Price: {product.price}
                        </li>
                        <li>
                            Status: {product.status}
                        </li>
                        <li>
                            Qty:
                            <select
                            value={qty}
                            onChange={(e) => {
                                setQty(e.target.value);
                                }}
                                >
                                {[...Array(product.countInStock).keys()].map(x =>
                                <option key={x+1} value={x+1}>
                                    {x+1}
                                </option>
                                )}
                            </select>
                        </li>
                        <li>
                            <button onClick={handleAddToCart} className="button primary">Add to Cart</button>
                        </li>
                    </ul>
                </div>
        </div>
    )}
    </div>
}
