import Container from 'react-bootstrap/Container';
import NavbarComponent from '../components/NavbarComponent';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CategoryProduct = () => {

    document.title = 'Category';

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <NavbarComponent />
            <Container className="py-5">
                <h3 className="text-white fw-bold"> List Category </h3>
                <Table striped bordered hover variant="dark" className='mt-4'>
                    <thead>
                        <tr>
                            <th className='col-sm-4'>No</th>
                            <th className='col-sm-4'>Category Name</th>
                            <th className='col-sm-4'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mouse</td>
                            <td>
                                <Row>
                                    <Col md={6}>
                                        <Link to='/editcategory' className='text-white text-decoration-none'><Button variant="success" className="w-100 fw-bold">Edit</Button></Link>
                                    </Col>
                                    <Col md={6}>
                                        <Button variant="danger" className="w-100 fw-bold" onClick={handleShow}>Delete</Button>
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Keyboard</td>
                            <td>
                                <Row>
                                    <Col md={6}>
                                        <Link to='/editcategory' className='text-white text-decoration-none'><Button variant="success" className="w-100 fw-bold">Edit</Button></Link>
                                    </Col>
                                    <Col md={6}>
                                        <Button variant="danger" className="w-100 fw-bold" onClick={handleShow}>Delete</Button>
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Bag</td>
                            <td>
                                <Row>
                                    <Col md={6}>
                                        <Link to='/editcategory' className='text-white text-decoration-none'><Button variant="success" className="w-100 fw-bold">Edit</Button></Link>
                                    </Col>
                                    <Col md={6}>
                                        <Button variant="danger" className="w-100 fw-bold" onClick={handleShow}>Delete</Button>
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Stationary</td>
                            <td>
                                <Row>
                                    <Col md={6}>
                                        <Link to='/editcategory' className='text-white text-decoration-none'><Button variant="success" className="w-100 fw-bold">Edit</Button></Link>
                                    </Col>
                                    <Col md={6}>
                                        <Button variant="danger" className="w-100 fw-bold" onClick={handleShow}>Delete</Button>
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Doll</td>
                            <td>
                                <Row>
                                    <Col md={6}>
                                        <Link to='/editcategory' className='text-white text-decoration-none'><Button variant="success" className="w-100 fw-bold">Edit</Button></Link>
                                    </Col>
                                    <Col md={6}>
                                        <Button variant="danger" className="w-100 fw-bold" onClick={handleShow}>Delete</Button>
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Pillow</td>
                            <td>
                                <Row>
                                    <Col md={6}>
                                        <Link to='/editcategory' className='text-white text-decoration-none'><Button variant="success" className="w-100 fw-bold">Edit</Button></Link>
                                    </Col>
                                    <Col md={6}>
                                        <Button variant="danger" className="w-100 fw-bold" onClick={handleShow}>Delete</Button>
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this data?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleClose} className="px-4">
                            Yes
                        </Button>
                        <Button variant="danger" onClick={handleClose} className="px-4">
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    )
}

export default CategoryProduct