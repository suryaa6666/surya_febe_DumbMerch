import Container from 'react-bootstrap/Container';
import NavbarComponent from '../components/NavbarComponent';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react'
import { API } from '../config/api'
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';



const EditProduct = () => {

    document.title = 'Edit Product';

    const navigate = useNavigate()

    const [preview, setPreview] = useState()
    const [form, setForm] = useState()
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState([]);

    const { id } = useParams()

    const getCategories = async () => {
        try {
            const response = await API.get('/category');
            setCategories(response.data.data);
            console.log(response, "category")
        } catch (error) {
            console.log(error);
        }
    };

    const getProduct = async () => {
        try {
            const response = await API.get(`/product/${id}`);
            setForm(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeCategoryId = (e) => {
        const id = e.target.value;
        const checked = e.target.checked;

        if (checked) {
            setCategoryId([...categoryId, parseInt(id)]);
        } else {
            let newCategoryId = categoryId.filter((categoryIdItem) => {
                return categoryIdItem != id;
            });
            setCategoryId(newCategoryId);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === 'file' ? e.target.files : e.target.value,
        });

        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };

    const handleSubmit = useMutation(async (event) => {
        try {
            event.preventDefault();

            const formData = new FormData()
            formData.set("img", form.image[0], form.image[0].name)
            formData.set("name", form.name)
            formData.set("desc", form.desc)
            formData.set("price", form.price)
            formData.set("qty", form.qty)
            // formData.set("categoryId", form.name)

            const data = await API.patch(`/product/${id}`, formData, {
                validateStatus: () => true,
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            })

            // await API.patch(`/productcategory/${id}`, {
            //     validateStatus: () => true,
            // })

            if (data.data.status != "success") return toast.error(data.data.message, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });

            toast.success('Edit product success!', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });

            navigate('/product')

        } catch (error) {
            console.log(error)
        }
    })
    useEffect(() => {
        getCategories();
        getProduct();
    }, []);

    return (
        <>
            <NavbarComponent />
            <Container className="py-5">
                <h3 className="text-white fw-bold"> Edit Product </h3>
                <Form className="mt-4" onSubmit={(e) => handleSubmit.mutate(e)}>
                    <div className="mb-3">
                        <img src={preview ? preview : form?.img} style={{ width: '200px', height: '200px', objectFit: 'cover' }} className="d-block"></img>
                        <label htmlFor="file-upload" className="btn btn-danger mt-3">
                            Upload Image
                        </label>
                        <input type="file" id="file-upload" accept="image/*" name="image" onChange={handleChange} style={{ display: 'none' }} />
                    </div>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Product name" style={{ backgroundColor: '#474647' }} className="text-white" name="name" onChange={handleChange} value={form?.name} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control as="textarea" placeholder="Product description" style={{ backgroundColor: '#474647' }} className="text-white" name="desc" onChange={handleChange} value={form?.desc} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="number" placeholder="Price" style={{ backgroundColor: '#474647' }} className="text-white" name="price" onChange={handleChange} value={form?.price} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="number" placeholder="Stock" style={{ backgroundColor: '#474647' }} className="text-white" name="qty" onChange={handleChange} value={form?.qty} />
                    </Form.Group>
                    {categories?.map((item, index) => (
                        <label className="checkbox-inline me-4" key={index}>
                            <input
                                type="checkbox"
                                value={item.id}
                                onClick={handleChangeCategoryId}
                            />
                            {item.name}
                        </label>
                    ))}
                    <Button variant="success" type="submit" className="w-100 mt-4">
                        Save
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default EditProduct