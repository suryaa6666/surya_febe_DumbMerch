import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import NavbarComponent from "../components/NavbarComponent"
import Container from 'react-bootstrap/Container';
import ProductCardComponent from "../components/ProductCardComponent";
import data from '../dummyData';

const HomePage = () => {

    document.title = 'Home';

    return (
        <>
            <NavbarComponent />
            <Container className="py-5">
                <h3 className="text-danger fw-bold"> Product </h3>
                <Row>
                    {
                        data.map((item, i) => {
                            return (
                                <Col lg={3} md={4} sm={6} key={i.toString()}>
                                    <ProductCardComponent title={item.name} price={item.price} stock={item.stock} imagesrc={`../assets/img/${item.photo}`} id={item.id} className="mx-3"/>
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