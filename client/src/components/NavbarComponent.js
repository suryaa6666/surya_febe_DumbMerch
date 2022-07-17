import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const NavbarComponent = () => {

    const navigate = useNavigate();

    let isAdmin = JSON.parse(localStorage.getItem('userLogin'));
    isAdmin = isAdmin["role"] == 'admin';

    const handleComplain = () => {
        navigate('/complain');
    }

    const handleProfile = () => {
        navigate('/profile');
    }

    const handleCategory = () => {
        navigate('/category');
    }

    const handleProduct = () => {
        navigate('/product');
    }

    const handleWishlist = () => {
        navigate('/wishlist');
    }

    const handleLogout = () => {
        localStorage.removeItem('userLogin');
        toast.success('Logout success!', {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
        navigate('/');
    }

    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" className="pe-5 ps-5 sticky-top" style={{ backgroundColor: '#0A0A0B' }}>
            <Navbar.Brand>
                <Link to="/home">
                    <img
                        src="../assets/img/logo.png"
                        width="70"
                        height="70"
                        className="d-inline-block align-top"
                        alt="Dumb Merch Logo"
                    />
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="d-flex justify-content-end w-100">
                    <Nav.Link onClick={handleComplain} className="mx-2 fw-bold" style={{ color: '#FFF' }}>Complain</Nav.Link>
                    {isAdmin ? <Nav.Link onClick={handleCategory} className="mx-2 fw-bold" style={{ color: '#FFF' }}>Category</Nav.Link> : ''}
                    {isAdmin ? <Nav.Link onClick={handleProduct} className="mx-2 fw-bold" style={{ color: '#FFF' }}>Product</Nav.Link> : ''}
                    {isAdmin ? '' : <Nav.Link onClick={handleProfile} className="mx-2 fw-bold" style={{ color: '#FFF' }}>Profile</Nav.Link>}
                    {isAdmin ? '' : <Nav.Link onClick={handleWishlist} className="mx-2 fw-bold" style={{ color: '#FFF' }}>Wishlist</Nav.Link>}
                    <Nav.Link onClick={handleLogout} className="mx-2 fw-bold" style={{ color: '#FFF' }}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarComponent