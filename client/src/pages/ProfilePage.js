import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import NavbarComponent from "../components/NavbarComponent";
import ProductTransactionComponent from "../components/ProductTransactionComponent";
import { useState, useEffect } from 'react';

const ProfilePage = () => {

    document.title = 'My Profile';

    const [subTotal, setSubTotal] = useState(0);

    let data = localStorage.getItem('buy') ? JSON.parse(localStorage.getItem('buy')) : [];

    const getSubTotal = () => {
        let total = 0;
        data.map(item => total += item.price);
        setSubTotal(total);
    }

    useEffect(() => {
        getSubTotal();
    }, []);

    const priceFormatter = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price)
    }

    return (
        <>
            <NavbarComponent />
            <Container className="py-5">
                <h3 className="text-danger fw-bold"> My Profile </h3>
                <Row>
                    <Col lg={6} md={12}>
                        <Row>
                            <Col sm={6}>
                                <img src='../assets/img/myprofile.jpg' alt="Image cannot be loaded" className='w-100' style={{ maxHeight: '400px', objectFit: 'cover', borderRadius: '10px' }} />
                            </Col>
                            <Col sm={6}>
                                <div>
                                    <h4 className="text-danger fw-bold">Name</h4>
                                    <p className="text-white">Surya</p>
                                </div>
                                <div>
                                    <h4 className="text-danger fw-bold">Email</h4>
                                    <p className="text-white">suryahalo@gmail.com</p>
                                </div>
                                <div>
                                    <h4 className="text-danger fw-bold">Phone</h4>
                                    <p className="text-white">089514043621</p>
                                </div>
                                <div>
                                    <h4 className="text-danger fw-bold">Gender</h4>
                                    <p className="text-white">Male</p>
                                </div>
                                <div>
                                    <h4 className="text-danger fw-bold">Address</h4>
                                    <p className="text-white">Jln. PC Kentang Kelurahan Plis Beliin yang Baru</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={6} md={12}>
                        <h3 className="text-danger fw-bold"> My Transaction </h3>
                        <div className="w-100" style={{ backgroundColor: '#303031', padding: '20px' }}>
                            {
                                data.map((item, i) => {
                                    return <ProductTransactionComponent photo={item.photo} name={item.name} price={item.price} date={item.date} id={item.id} key={i.toString()} />
                                })
                            }
                            <p className="w-100 fw-bold text-white">
                                Sub Total : {priceFormatter(subTotal)}
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ProfilePage