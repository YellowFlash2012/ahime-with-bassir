import RiseLoader from "react-spinners/RiseLoader";

const Loading = () => {
    return (
        <div className="d-flex justify-content-center align-items-center h-100">
            <RiseLoader size={25} color="green" />
        </div>
    );
};
export default Loading;
