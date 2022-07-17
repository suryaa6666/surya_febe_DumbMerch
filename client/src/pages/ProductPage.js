import Container from 'react-bootstrap/Container';
import NavbarComponent from '../components/NavbarComponent';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductPage = () => {

    document.title = 'List Product';

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const maxWord = (word) => {
        return word.length >= 40 ? word.substring(0, 40) + "..." : word;
    }

    return (
        <>
            <NavbarComponent />
            <Container className="py-5">
                <h3 className="text-white fw-bold"> List Product </h3>
                <Table striped bordered hover variant="dark" className='mt-4'>
                    <thead>
                        <tr>
                            <th className='col-sm-1'>No</th>
                            <th className='col-sm-2'>Photo</th>
                            <th className='col-sm-2'>Product Name</th>
                            <th className='col-sm-2'>Product Desc</th>
                            <th className='col-sm-1'>Price</th>
                            <th className='col-sm-1'>Qty</th>
                            <th className='col-sm-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td><a href="" className="text-white">Mouse.jpg</a></td>
                            <td>Mouse</td>
                            <td> {maxWord(`Halo ini adalah sebuah mouse yang sangat keren`)} </td>
                            <td>500.000</td>
                            <td>600</td>
                            <td>
                                <Row>
                                    <Col md={6}>
                                        <Link to='/editproduct' className='text-white text-decoration-none'><Button variant="success" className="w-100 fw-bold">Edit</Button></Link>
                                    </Col>
                                    <Col md={6}>
                                        <Button variant="danger" className="w-100 fw-bold" onClick={handleShow}>Delete</Button>
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td><a href="" className="text-white">Keyboard.jpg</a></td>
                            <td>Keyboard</td>
                            <td> {maxWord(`Keyboard ini adalah sebuah keyboard yang sangat mahal dan keren sekali uwuuu`)} </td>
                            <td>700.000</td>
                            <td>600</td>
                            <td>
                                <Row>
                                    <Col md={6}>
                                        <Link to='/editproduct' className='text-white text-decoration-none'><Button variant="success" className="w-100 fw-bold">Edit</Button></Link>
                                    </Col>
                                    <Col md={6}>
                                        <Button variant="danger" className="w-100 fw-bold" onClick={handleShow}>Delete</Button>
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td><a href="" className="text-white">Bag.jpg</a></td>
                            <td>Bag</td>
                            <td> {maxWord(`Bag ini adalah sebuah kenangan yang indah bersama mantan eh tapi saya ngga punya mantan`)} </td>
                            <td>300.000</td>
                            <td>600</td>
                            <td>
                                <Row>
                                    <Col md={6}>
                                        <Link to='/editproduct' className='text-white text-decoration-none'><Button variant="success" className="w-100 fw-bold">Edit</Button></Link>
                                    </Col>
                                    <Col md={6}>
                                        <Button variant="danger" className="w-100 fw-bold" onClick={handleShow}>Delete</Button>
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td><a href="" className="text-white">Stationary.jpg</a></td>
                            <td>Stationary</td>
                            <td> {maxWord(`Stationary adalah sebuah stationary yang very cool dan mantap jiwa`)} </td>
                            <td>25.000</td>
                            <td>200</td>
                            <td>
                                <Row>
                                    <Col md={6}>
                                        <Link to='/editproduct' className='text-white text-decoration-none'><Button variant="success" className="w-100 fw-bold">Edit</Button></Link>
                                    </Col>
                                    <Col md={6}>
                                        <Button variant="danger" className="w-100 fw-bold" onClick={handleShow}>Delete</Button>
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td><a href="" className="text-white">Doll.jpg</a></td>
                            <td>Doll</td>
                            <td> {maxWord(`Doll ini adalah sebuah doll yang keramat sekali`)} </td>
                            <td>125.000</td>
                            <td>192</td>
                            <td>
                                <Row>
                                    <Col md={6}>
                                        <Link to='/editproduct' className='text-white text-decoration-none'><Button variant="success" className="w-100 fw-bold">Edit</Button></Link>
                                    </Col>
                                    <Col md={6}>
                                        <Button variant="danger" className="w-100 fw-bold" onClick={handleShow}>Delete</Button>
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td><a href="" className="text-white">Pillow.jpg</a></td>
                            <td>Pillow</td>
                            <td> {maxWord(`Halo ini adalah sebuah pillow yang sangat empuk`)} </td>
                            <td>300.000</td>
                            <td>123</td>
                            <td>
                                <Row>
                                    <Col md={6}>
                                        <Link to='/editproduct' className='text-white text-decoration-none'><Button variant="success" className="w-100 fw-bold">Edit</Button></Link>
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

export default ProductPage