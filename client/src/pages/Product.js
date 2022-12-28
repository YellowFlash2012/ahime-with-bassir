import { useParams } from "react-router-dom";

const Product = () => {
    const {slug} = useParams();

    return <div>{slug}</div>;
};
export default Product;
