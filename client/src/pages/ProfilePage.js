import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import NavbarComponent from "../components/NavbarComponent";
import ProductTransactionComponent from "../components/ProductTransactionComponent";
import { useState, useEffect } from 'react';
import { API } from '../config/api'

const ProfilePage = () => {

    document.title = 'My Profile';

    const [subTotal, setSubTotal] = useState(0);
    const [profile, setProfile] = useState()
    const [transaction, setTransaction] = useState()

    const getSubTotal = async () => {
        let total = 0;
        await transaction?.map(item => total += item.price);
        setSubTotal(total);
    }

    const getProfile = async () => {
        const dataProfile = await API.get(`/checkAuth`)
        console.log(dataProfile, "ini profile")
        setProfile(dataProfile.data.data)
    }

    const getTransaction = async () => {
        const dataProfile = await API.get(`/transaction`)
        console.log(dataProfile, "ini transaction")
        setTransaction(dataProfile.data.data)
    }

    useEffect(() => {
        getProfile();
        getTransaction();
        getSubTotal()
    }, [transaction]);

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
                                    <p className="text-white">{profile?.name}</p>
                                </div>
                                <div>
                                    <h4 className="text-danger fw-bold">Email</h4>
                                    <p className="text-white">{profile?.email}</p>
                                </div>
                                <div>
                                    <h4 className="text-danger fw-bold">Phone</h4>
                                    <p className="text-white">{profile?.profile.phone ? profile?.profile.phone : '-'}</p>
                                </div>
                                <div>
                                    <h4 className="text-danger fw-bold">Gender</h4>
                                    <p className="text-white">{profile?.profile.phone ? profile?.profile.gender : '-'}</p>
                                </div>
                                <div>
                                    <h4 className="text-danger fw-bold">Address</h4>
                                    <p className="text-white">{profile?.profile.phone ? profile?.profile.address : '-'}</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={6} md={12}>
                        <h3 className="text-danger fw-bold"> My Transaction </h3>
                        <div className="w-100" style={{ backgroundColor: '#303031', padding: '20px' }}>
                            {
                                transaction?.map((item, i) => {
                                    return <ProductTransactionComponent photo={item.product.img} name={item.product.name} price={item.price} date={item.createdAt} id={item.product.id} status={item.status} key={i.toString()} />
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