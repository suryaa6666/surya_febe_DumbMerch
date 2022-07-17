import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavbarComponent from '../components/NavbarComponent';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const ComplainPage = () => {

    document.title = 'Complain';

    const maxWord = (word) => {
        return word.length >= 25 ? word.substring(0, 25) + "..." : word;
    }

    return (
        <>
            <NavbarComponent />
            <div style={{ marginTop: '50px' }}>
                <Row className="text-white px-4">
                    <Col lg={3} md={12} style={{ borderRight: '1px solid #6A6A6A' }}>
                        <Button style={{ backgroundColor: 'transparent', border: 'none' }} className="w-100">
                            <Row className="p-1">
                                <Col sm={3}>
                                    <img src='../assets/img/myprofile.jpg' className='rounded-circle' style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                </Col>
                                <Col sm={9}>
                                    <h6 className="fw-bold d-flex justify-content-start">surya tamvan</h6>
                                    <p style={{ fontSize: '12px' }} className="d-flex justify-content-start">{maxWord(`Hello surya, kemarin udah coba ini kan?`)}</p>
                                </Col>
                            </Row>
                        </Button>
                        <Button style={{ backgroundColor: 'transparent', border: 'none' }} className="w-100">
                            <Row className="p-1">
                                <Col sm={3}>
                                    <img src='../assets/img/myprofile.jpg' className='rounded-circle' style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                </Col>
                                <Col sm={9}>
                                    <h6 className="fw-bold d-flex justify-content-start">surya lagi</h6>
                                    <p style={{ fontSize: '12px' }} className="d-flex justify-content-start">{maxWord(`Hello surya, lagi apa? sehat?`)}</p>
                                </Col>
                            </Row>
                        </Button>
                    </Col>
                    <Col lg={9} md={12} className="px-4" style={{ height: '70vh' }}>
                        <div style={{ height: '60vh' }} className="d-flex justify-content-end flex-column">
                            <Row className="d-flex align-items-center my-2 w-100">
                                <Col sm={1}>
                                    <img src='../assets/img/myprofile.jpg' className='rounded-circle' style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                </Col>
                                <Col sm={11}>
                                    <div style={{ backgroundColor: '#565756', borderRadius: '10px' }} className="p-2">
                                        Hello surya, kemarin udah coba ini kan?
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <Form className="mt-4">
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="Send Message" style={{ backgroundColor: '#474647' }} className="px-3 py-2 text-white" />
                                </Form.Group>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ComplainPage