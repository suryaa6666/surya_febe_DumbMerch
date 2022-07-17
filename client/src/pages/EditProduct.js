import Container from 'react-bootstrap/Container';
import NavbarComponent from '../components/NavbarComponent';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import editProductStyle from '../styles/EditProduct.module.css';

const EditProduct = () => {

    document.title = 'Edit Product';

    return (
        <>
            <NavbarComponent />
            <Container className="py-5">
                <h3 className="text-white fw-bold"> Edit Product </h3>
                <Form className="mt-4">
                    <div className="mb-3">
                        <Row>
                            <Col sm={2}>
                                <label htmlFor="file-upload" className="btn btn-danger">
                                    Upload Image
                                </label>
                            </Col>
                            <Col sm={10} className="d-flex justify-content-start">
                                <p className="text-white" id="uploadfilename">Mouse.jpg</p>
                            </Col>
                        </Row>
                        <input type="file" id="file-upload" accept="image/*" />
                    </div>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Product name" style={{ backgroundColor: '#474647' }} className="text-white" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control as="textarea" placeholder="Product description" style={{ backgroundColor: '#474647' }} className="text-white" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="number" placeholder="Price" style={{ backgroundColor: '#474647' }} className="text-white" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="number" placeholder="Stock" style={{ backgroundColor: '#474647' }} className="text-white" />
                    </Form.Group>
                    <Button variant="success" type="submit" className="w-100 mt-4">
                        Save
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default EditProduct