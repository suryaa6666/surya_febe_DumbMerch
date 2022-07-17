import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { API } from '../config/api'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom';


const ProductCardComponent = (props) => {

    const [star, setStar] = useState(false);

    const priceFormatter = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price)
    }

    const handleWishlist = async () => {
        if (star) {
            await API.delete(`/wishlist/${props.id}`)
            toast.success('Product removed from wishlist!', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            setStar(false)
        } else {
            await API.post(`/wishlist`, {
                idProduct: props.id
            })
            toast.success('Product added to wishlist!', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            setStar(true)
        }
    }

    const handleIsStar = async () => {
        let data = await API.get(`/wishlist/${props.id}`)
        data.data.data ? setStar(true) : setStar(false)
    }

    useEffect(() => {
        handleIsStar()
    }, [])

    return (
        <Card style={{ width: '15rem', border: 'none', marginTop: '20px', marginBottom: '20px', backgroundColor: '#202021' }}>
            <button className={`btn btn-${star ? 'danger' : 'primary'}`} style={{ position: 'absolute', top: '0', right: '0' }} onClick={handleWishlist}>
                {star ? 'Unstar' : 'Star'}
            </button>
            <Card.Img variant="top" src={props.imagesrc} alt="Product image" style={{ height: '300px', width: '100%', objectFit: 'cover' }} />
            <Card.Body style={{ backgroundColor: '#202021', borderRadius: '10px' }}>
                <Card.Title className="fw-bold"> <Link to={`/detail/${props.id}`} className="text-decoration-none text-danger"> {props.title} </Link></Card.Title>
                <Card.Text className="text-white">
                    {priceFormatter(props.price)}
                </Card.Text>
                <Card.Text className="text-white">
                    Stock : {props.stock}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ProductCardComponent