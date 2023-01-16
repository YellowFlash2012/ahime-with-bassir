import { useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
    const navigate = useNavigate();

    const [query, setQuery] = useState("");

    const searchHandler = (e) => {
        e.preventDefault();

        navigate(query ? `/search/?query=${query}` : "/search");
    };
    return (
        <div>
            <Form className="d-flex me-auto" onSubmit={searchHandler}>
                <InputGroup>
                    <FormControl
                        type="text"
                        name="query"
                        id="query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search products..."
                        aria-label="Search products"
                        aria-describedby="button-search"
                    />

                    <Button
                        type="submit"
                        variant="outline-primary"
                        id="button-search"
                    >
                        <i className="fas fa-search"></i>
                    </Button>
                </InputGroup>
            </Form>
        </div>
    );
};
export default SearchBox;
