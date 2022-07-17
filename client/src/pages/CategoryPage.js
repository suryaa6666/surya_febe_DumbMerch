import Container from 'react-bootstrap/Container';
import NavbarComponent from '../components/NavbarComponent';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../config/api'
import { toast } from 'react-toastify';


const CategoryProduct = () => {

    document.title = 'Category';

    const [show, setShow] = useState(false);
    const [category, setCategory] = useState();
    const [selectedIdDelete, setSelectedIdDelete] = useState()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getCategory = async () => {
        const data = await API.get('/category')
        setCategory(data.data.data)
    }

    const handleDelete = async () => {
        await API.delete(`/category/${selectedIdDelete}`)
        setCategory(category.filter((item) => {
            return item.id != selectedIdDelete
        }));

        toast.success('Delete category success!', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }

    const handleIdDelete = (id) => {
        setSelectedIdDelete(id)
        console.log(selectedIdDelete)
    }

    useEffect(() => {
        getCategory()
    }, [])


    return (
        <>
            <NavbarComponent />
            <Container className="py-5">
                <div className='d-flex justify-content-space'>
                    <h3 className="text-white fw-bold"> List Category </h3>
                    <Link to={'/addcategory'} className="d-flex justify-content-end" style={{ width: "80%" }}> <Button variant="primary">Add Category</Button> </Link>
                </div>
                <Table striped bordered hover variant="dark" className='mt-4'>
                    <thead>
                        <tr>
                            <th className='col-sm-4'>No</th>
                            <th className='col-sm-4'>Category Name</th>
                            <th className='col-sm-4'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{parseInt(index) + 1}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <Row>
                                            <Col md={6}>
                                                <Link to={`/editcategory/${item.id}`} className='text-white text-decoration-none'><Button variant="success" className="w-100 fw-bold">Edit</Button></Link>
                                            </Col>
                                            <Col md={6}>
                                                <Button variant="danger" className="w-100 fw-bold" onClick={() => { handleShow(); handleIdDelete(item.id) }}>Delete</Button>
                                            </Col>
                                        </Row>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this data?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={() => { handleDelete(); handleClose() }} className="px-4">
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