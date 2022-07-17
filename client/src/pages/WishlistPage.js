import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import NavbarComponent from "../components/NavbarComponent"
import Container from 'react-bootstrap/Container';
import ProductCardComponent from "../components/ProductCardComponent";
import { useState, useEffect } from 'react';


const WishlistPage = () => {

    document.title = 'Home';

    const [data, setData] = useState();

    const getWishlistData = () => {
        const wishlist = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [];
        setData(wishlist);
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
                        data?.map((item, i) => {
                            return (
                                <Col lg={3} md={4} sm={6} key={i.toString()}>
                                    <ProductCardComponent title={item.title} price={item.price} stock={item.stock} imagesrc={item.imagesrc} id={item.id} />
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