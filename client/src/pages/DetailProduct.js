import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import NavbarComponent from "../components/NavbarComponent"
import Container from 'react-bootstrap/Container';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../config/api'
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/userContext'

const DetailProduct = () => {

    document.title = 'Detail Product';

    const { id } = useParams();

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [state, dispatch] = useContext(UserContext);

    // let isAdmin = JSON.parse(localStorage.getItem('userLogin'));
    // isAdmin = isAdmin["role"] == 'admin';

    const getData = async () => {
        const dataDetail = await API.get(`/product/${id}`)
        setData(dataDetail.data.data)
        console.log(dataDetail, 'detail produk')
    }

    useEffect(() => {
        getData();
    }, [])

    const handleBuy = async () => {
        // let buy = localStorage.getItem('buy') ? JSON.parse(localStorage.getItem('buy')) : [];
        // buy.push({ ...dataDetail, date: Date.now() });
        // localStorage.setItem('buy', JSON.stringify(buy));
        const dataPost = {
            idProduct: data.id,
            idBuyer: state.user.id,
            idSeller: data.user.id,
            status: 'pending',
            price: data.price
        }

        await API.post(`/transaction`, dataPost)

        toast.success('Transaction success!', {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
        navigate('/profile');
    }

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
                <Row>
                    <Col sm={4}>
                        <img src={`${data.img}`} alt="Image cannot be loaded" className='w-100' style={{ maxHeight: '400px', objectFit: 'cover', borderRadius: '10px' }} />
                    </Col>
                    <Col sm={7}>
                        <h2 className="text-danger fw-bold"> {data.name} </h2>
                        <div className="text-white">
                            <p>Stock : {data.qty} </p>
                            <p style={{ height: '250px', maxHeight: '250px', wordWrap: 'break-word', overflowX: 'hidden', overflowY: 'auto' }}>
                                {data.description}
                            </p>
                        </div>
                        <div className="d-flex justify-content-end">
                            <h3 className="text-danger fw-bold"> {priceFormatter(data.price)} </h3>
                        </div>
                        <div>
                            <Button variant="danger" type="submit" className="w-100 mt-4" onClick={handleBuy}>
                                Buy
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default DetailProduct