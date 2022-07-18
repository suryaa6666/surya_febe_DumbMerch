import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import NavbarComponent from "../components/NavbarComponent"
import Container from 'react-bootstrap/Container';
import ProductCardComponent from "../components/ProductCardComponent";
import { useState, useEffect, useContext } from 'react'
import { API } from '../config/api'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom';


const HomePage = () => {

    document.title = 'Home';
    const [product, setProduct] = useState();
    const [state, dispatch] = useContext(UserContext)

    const navigate = useNavigate()

    const getProduct = async () => {
        const data = await API.get('/product')
        setProduct(data.data.data)
    }

    useEffect(() => {
        state.user.status === "admin" ? navigate('/complainadmin') : navigate('/home')
        getProduct()
    }, [])


    return (
        <>
            <NavbarComponent />
            <Container className="py-5">
                <h3 className="text-danger fw-bold"> Product </h3>
                <Row>
                    {
                        product?.map((item, i) => {
                            return (
                                <Col lg={3} md={4} sm={6} key={i.toString()}>
                                    <ProductCardComponent title={item.name} price={item.price} stock={item.qty} imagesrc={`${item.img}`} id={item.id} product={item} className="mx-3" />
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </>
    )
}

export default HomePage