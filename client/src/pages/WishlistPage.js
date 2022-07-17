import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import NavbarComponent from "../components/NavbarComponent"
import Container from 'react-bootstrap/Container';
import ProductCardComponent from "../components/ProductCardComponent";
import { useState, useEffect } from 'react';
import { API } from '../config/api'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const WishlistPage = () => {

    document.title = 'Home';

    const [wishlist, setWishlist] = useState([]);

    const getWishlistData = async () => {
        const wishlistData = await API.get(`/wishlists`, {
            validateStatus: () => true
        })

        if (wishlistData.data.status !== "success") return toast.error(wishlistData.data.message, {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });

        console.log(wishlistData.data.data, 'ini wishlist')
        setWishlist(wishlistData.data.data);
    }

    useEffect(() => {
        getWishlistData();
    }, []);

    return (
        <>
            <NavbarComponent />
            <Container className="py-5">
                <h3 className="text-danger fw-bold"> My Wishlist Product </h3>
                <Row>
                    {
                        wishlist?.map((item, i) => {
                            return (
                                <Col lg={3} md={4} sm={6} key={i.toString()}>
                                    <ProductCardComponent title={item.product.name} price={item.product.price} stock={item.product.qty} imagesrc={item.product.img} id={item.product.id} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </>
    )
}

export default WishlistPage