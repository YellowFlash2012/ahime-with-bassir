import { useEffect, useState} from "react";

import {useDispatch,useSelector} from "react-redux"
import { Link } from "react-router-dom";
import axios from "axios"
import RiseLoader from "react-spinners/RiseLoader"

import { fetchProducts } from "../features/productsSlice";


const Home = () => {
    

    const { products, loading, isError, error} = useSelector(store => store.products);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    
    return (
        <div>
            <main>
                <h1>Featured Products</h1>
                <div className="products-container">
                    {loading ? (
                        <div>
                            <RiseLoader size={25} color="green" />
                        </div>
                    ) : isError ? (
                            <div>{ error}</div>
                    ) : (
                        products.map((pdt) => (
                            <div key={pdt.slug} className="product-card">
                                <Link to={`/product/${pdt.slug}`}>
                                    <img src={pdt.image} alt={pdt.name} />
                                </Link>

                                <div className="product-info">
                                    <Link to={`/product/${pdt.slug}`}>
                                        <p>{pdt.name}</p>
                                    </Link>

                                    <p>
                                        <strong>${pdt.price}</strong>
                                    </p>

                                    <button>Add To Cart</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};
export default Home;
