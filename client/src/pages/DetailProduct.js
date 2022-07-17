import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import NavbarComponent from "../components/NavbarComponent"
import Container from 'react-bootstrap/Container';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import data from '../dummyData';

const DetailProduct = () => {

    document.title = 'Detail Product';

    const { id } = useParams();

    const navigate = useNavigate();

    let isAdmin = JSON.parse(localStorage.getItem('userLogin'));
    isAdmin = isAdmin["role"] == 'admin';

    const dataDetail = data.find(item => {
        return item.id == id;
    });

    const handleBuy = () => {
        let buy = localStorage.getItem('buy') ? JSON.parse(localStorage.getItem('buy')) : [];
        buy.push({ ...dataDetail, date: Date.now() });
        localStorage.setItem('buy', JSON.stringify(buy));
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
                        <img src={`../assets/img/${dataDetail.photo}`} alt="Image cannot be loaded" className='w-100' style={{ maxHeight: '400px', objectFit: 'cover', borderRadius: '10px' }} />
                    </Col>
                    <Col sm={7}>
                        <h2 className="text-danger fw-bold"> {dataDetail.name} </h2>
                        <div className="text-white">
                            <p>Stock : {dataDetail.stock} </p>
                            <p style={{ height: '250px', maxHeight: '250px', wordWrap: 'break-word', overflowX: 'hidden', overflowY: 'auto' }}>
                             {dataDetail.description}
                            </p>
                        </div>
                        <div className="d-flex justify-content-end">
                            <h3 className="text-danger fw-bold"> {priceFormatter(dataDetail.price)} </h3>
                        </div>
                        <div>
                            <Button variant="danger" type="submit" className="w-100 mt-4" onClick={handleBuy} disabled={isAdmin}>
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