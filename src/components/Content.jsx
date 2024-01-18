import React, {useState, useEffect} from "react";
import Filter from "./Filter";
import { Form, Button, Input, Row, Col, Card, Empty, Modal, Select } from "antd";
import axios from "axios";


function Content() {

    const [counter, setCounter] = useState(0)
    const handleDecrement = () => {
        if(counter !== 0){
            setCounter(counter - 1)
        }
    }
    const handleIncrement = () => {
        setCounter(counter + 1)
    }

    const dataBuah = [
        {
            id: 1,
            nama: "apel",
            harga: 10000,
            stock: 10,
            kategori: "lokal",
        },
        {
            id: 2,
            nama: "jeruk",
            harga: 15000,
            stock: 15,
            kategori: "lokal",
        },
        {
            id: 3,
            nama: "mangga",
            harga: 20000,
            stock: 20,
            kategori: "lokal",
        },
        {
            id: 4,
            nama: "anggur",
            harga: 30000,
            stock: 30,
            kategori: "import",
        },
        {
            id: 5,
            nama: "melon",
            harga: 25000,
            stock: 25,
            kategori: "import",
        },
    ];
    
    const [buah, setBuah] = useState(dataBuah)
    const [formInstance] = Form.useForm()
    const [formInstance2] = Form.useForm()

    const handleAddFruit = (formData) => {
        const id = buah.length + 1
        setBuah((prevData) => [...prevData, {id, ...formData}])
    }

    const handleAddFruitWithInstance = () => {
        const getData = {
            "nama": formInstance.getFieldValue("nama"),
            "harga": formInstance.getFieldValue("harga"),
            "stock": formInstance.getFieldValue("stock"),
            "kategori": formInstance.getFieldValue("kategori"),
        }
        const id = buah.length + 1
        setBuah((prevData) => [...prevData, {id, ...getData}])
    }

    const handleDeleteFruit = (id) => {
        setBuah((prevData) => prevData.filter((item) => item.id != id))
    }

    const [visible, setVisible] = useState(false)
    const onCancel = () => {
        setVisible(false)
    }


    const handleEditFruit = (item) => {
        formInstance2.setFieldsValue({
            id: item.id,
            nama: item.nama,
            harga: item.harga,
            stock: item.stock,
            kategori: item.kategori,
        })
        setVisible(true)
    }

    const handleUpdateData = (formData) => {
        setBuah((prevData) => prevData.map((item) => {
            return item.id === formData.id ? formData : item
        }))
        alert("Berhasil Update")
        setVisible(false)
    }


    const [data, setData] = useState([])

    const [skip, setSkip] = useState(0)
    useEffect(() => {
        axios.get(`https://dummyjson.com/products?limit=5&skip=${skip}`)
        .then((res) => setData((prevData) => [...prevData, ...res.data?.products]))
        .catch((err) => {
            console.log(err)
        })
    }, [skip])


    const handleViewMore = () => {
        setSkip(skip + 5) 
    }

    return (
        <>
            <h1>Data:</h1>
            <Filter 
                buah={buah}
                setBuah={setBuah}
            />
            <div style={{
                "display": "flex",
                "justifyContent": "space-between"
            }}>
                <Row gutter={[16, 16]} style={{
                    "flexBasis": "75%"
                }}>
                    {data.length != 0 ? data.map((item, index) => {
                            return (
                                <Col span={6} key={index} style={{
                                    'padding': '0px 10px',
                                    'width': '100%'
                                }}>
                                     <Card title={item.nama}>
                                        <div style={{
                                            display: "flex",
                                            "justifyContent": "space-between"
                                        }}>
                                            <h1 onClick={() => {
                                                handleDeleteFruit(item.id)
                                            }}>x</h1>
                                            <h1 onClick={() => {
                                                handleEditFruit(item)
                                            }}>Edit</h1>
                                        </div>
                                        <p>id: {item.id}</p>
                                        <p>nama: {item.brand}</p>
                                        <p>harga: {item.price}</p>
                                        <p>rating: {item.rating}</p>
                                        <p>kategori: {item.category}</p>
                                     </Card>
                                </Col>
                            )
                        }) : <Empty />
                    }
                    <Button onClick={handleViewMore}>View More</Button>
                </Row>
                <div style={{
                    "flexBasis": "25%"
                }}>
                    <Form form={formInstance}
                    onFinish={handleAddFruit}
                    >
                        <Form.Item
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            name="nama"
                            label="Nama"
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="harga"
                            label="Harga"
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="stock"
                            label="Stock"
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="kategori"
                            label="Kategori"
                        >
                            <Input/>
                        </Form.Item>
                        <Button 
                            htmlType="submit"
                            type="primary"
                            // onClick={()=>{
                            //     handleAddFruitWithInstance()
                            // }}
                        >Submit</Button>
                    </Form>
                    <div style={{
                        "marginTop": "10px"
                    }}>
                        <Button onClick={() => {
                            handleDecrement()
                        }}>-</Button>
                        {counter}
                        <Button onClick={() => {
                            handleIncrement()
                        }}>+</Button>
                    </div>
                </div>
                <Modal visible={visible} onCancel={onCancel}>
                    <Form 
                    form={formInstance2}
                    onFinish={handleUpdateData}
                    >
                        <Form.Item
                            name="id"
                            label="id"
                            style={{
                                display: "none"
                            }}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            name="nama"
                            label="Nama"
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="harga"
                            label="Harga"
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="stock"
                            label="Stock"
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="kategori"
                        >
                            <Select
                                showSearch
                                style={{
                                width: 200,
                                }}
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={[
                                {
                                    value: 'lokal',
                                    label: 'lokal',
                                },
                                {
                                    value: 'import',
                                    label: 'import',
                                }
                                ]}
                            />
                        </Form.Item>
                        <Button 
                            htmlType="submit"
                            type="primary"
                        >Submit</Button>
                    </Form>
                </Modal>
            </div>
        </>
    )

   
}

export default Content;