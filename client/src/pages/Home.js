import { Link } from "react-router-dom";
import data from "../../../database/data";

const Home = () => {
    return (
        <div>
            <main>
                <h1>Featured Products</h1>
                <div className="products-container">
                    {data.products.map((pdt) => (
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
                    ))}
                </div>
            </main>
        </div>
    );
};
export default Home;
