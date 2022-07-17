import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

const ProductCardComponent = (props) => {

    const [star, setStar] = useState(false);

    const priceFormatter = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price)
    }

    const handleStarExist = () => {
        let wishlist = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [];
        const wishlistExist = wishlist.some(item => {
            return item.id == props.id
        });
        wishlistExist ? setStar(true) : setStar(false);
    }

    useEffect(() => {
        handleStarExist();
    }, []);

    const handleWishlist = () => {
        let wishlist = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [];
        const wishlistExist = wishlist.some(item => {
            return item.id == props.id
        }); //if it is already in wishlist
        if (!wishlistExist) {
            wishlist.push({ ...props, date: Date.now() });
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            setStar(true);
            return toast.success('Item added to wishlist!', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
        setStar(false);
        wishlist = wishlist.filter(item => {
            return item.id != props.id;
        });
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        return toast.success('Item has been removed from wishlist!', {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        <Card style={{ width: '15rem', border: 'none', marginTop: '20px', marginBottom: '20px', backgroundColor: '#202021' }}>
            <button className={`btn btn-${star ? 'danger' : 'primary'}`} style={{ position: 'absolute', top: '0', right: '0' }} onClick={handleWishlist}>
                {star ? 'Unstar' : 'Star'}
            </button>
            <Card.Img variant="top" src={props.imagesrc} alt="Product image" style={{ maxHeight: '300px' }} />
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