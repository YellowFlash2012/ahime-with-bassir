import { useEffect, useState } from "react";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../features/authSlice";

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector(store => store.auth);

    // if (!user) {
    //     navigate("/login")
    // }

    const [ name, setName ] = useState(user.name);
    const [ email, setEmail ] = useState(user.email);
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");

    const [sellerName, setSellerName] = useState(user.seller.name);
    const [sellerLogo, setSellerLogo] = useState(user.seller.logo);
    const [sellerDescription, setSellerDescription] = useState(
        user.seller.description
    );
    const [sellerRating, setSellerRating] = useState(0);
    const [sellerNumReviews, setSellerNumReviews] = useState(0);
    
    const updateUserProfileHandler = async (e) => {
        e.preventDefault()

        dispatch(updateUserProfile({ name, email, password, sellerName, sellerLogo, sellerDescription }));
}
    
    return (
        <div className="container small-container">
            <Helmet>
                <title>User Profile</title>
            </Helmet>

            <h1 className="my-3">User Profile</h1>

            <form action="" onSubmit={updateUserProfileHandler}>
                <FormGroup className="mb-3" controlId="name">
                    <FormLabel>Name</FormLabel>

                    <FormControl
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </FormGroup>

                <FormGroup className="mb-3" controlId="email">
                    <FormLabel>Email</FormLabel>

                    <FormControl
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </FormGroup>

                <FormGroup className="mb-3" controlId="password">
                    <FormLabel>Password</FormLabel>

                    <FormControl
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </FormGroup>

                <FormGroup className="mb-3" controlId="cpassword">
                    <FormLabel>Confirm Password</FormLabel>

                    <FormControl
                        type="password"
                        value={cpassword}
                        onChange={(e) => setCPassword(e.target.value)}
                        required
                    />
                </FormGroup>

                {user.isSeller && (
                    <>
                        <h2>Seller</h2>
                        <div>
                            <FormGroup className="mb-3" controlId="sellerName">
                                <FormLabel>Seller Name</FormLabel>

                                <FormControl
                                    id="sellerName"
                                    type="text"
                                    placeholder="Enter seller's name"
                                    value={sellerName}
                                    onChange={(e) =>
                                        setSellerName(e.target.value)
                                    }
                                    required
                                />
                            </FormGroup>

                            <FormGroup className="mb-3" controlId="sellerLogo">
                                <FormLabel>Seller Logo</FormLabel>

                                <FormControl
                                    id="sellerLogo"
                                    type="file"
                                    placeholder="Add seller's logo file"
                                    value={sellerLogo}
                                    onChange={(e) =>
                                        setSellerLogo(e.target.value)
                                    }
                                    required
                                />
                            </FormGroup>

                            <FormGroup
                                className="mb-3"
                                controlId="sellerDescription"
                            >
                                <FormLabel>Seller Description</FormLabel>

                                <FormControl
                                    id="sellerDescription"
                                    type="text"
                                    placeholder="Enter seller's description"
                                    value={sellerDescription}
                                    onChange={(e) =>
                                        setSellerDescription(e.target.value)
                                    }
                                    required
                                />
                            </FormGroup>
                        </div>
                    </>
                )}

                <div className="mb-3">
                    <Button type="submit">Update</Button>
                </div>
            </form>
        </div>
    );
};
export default Profile;
