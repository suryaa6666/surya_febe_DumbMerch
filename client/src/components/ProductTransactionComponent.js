import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const ProductTransactionComponent = (props) => {

    const priceFormatter = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price)
    }

    const getFullDate = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let day = new Date(props.date).getDay();
        day = days[day];
        let date = new Date(props.date).getDate();
        date = date < 10 ? '0' + date : date;
        let month = new Date(props.date).getMonth();
        month = months[month];
        const year = new Date(props.date).getFullYear();
        const fullDate = `${day}, ${date} ${month} ${year}`;
        return fullDate;
    }

    return (
        <Row className="my-3">
            <Col sm={3}>
                <img src={`${props.photo}`} alt="Image cannot be loaded" className='w-100 h-100' style={{ objectFit: 'cover', borderRadius: '10px' }} />
            </Col>
            <Col sm={6} className="text-white">
                <h5 className="fw-bold"><Link to={`/detail/${props.id}`} className="text-danger text-decoration-none">{props.name}</Link></h5>
                <p className="text-danger">
                    {getFullDate()}
                </p>
                <p>
                    Price : {priceFormatter(props.price)}
                </p>
            </Col>
            <Col sm={3}>
                <div class="btn-primary d-flex justify-content-center align-items-center h-100 w-100">
                    {props.status}
                </div>
            </Col>
        </Row>
    )
}

export default ProductTransactionComponent