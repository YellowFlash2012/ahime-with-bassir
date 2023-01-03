import { Alert } from "react-bootstrap";

const MessageBox = (props) => {
    return <div className="mt-5 text-center">
        <Alert variant={props.variant || 'info'}>{props.children}</Alert>
    </div>;
};
export default MessageBox;
