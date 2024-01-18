import React from "react";
import {Form, Input, Button, Select} from "antd";

function Filter({buah, setBuah}) {

    const handleFilterFruit = (formData) => {
        // const lowerKategori = (formData.kategori)?.toLowerCase()
        // const lowerNama = (formData.nama)?.toLowerCase()
        console.log(formData)
        // const isFieldFiltered = {
        //     nama: 0,
        //     kategori: 0,
        //     harga: 0,
        // }
        // if(formData.nama != ''){
        //     isFieldFiltered.nama = 1
        // }

        setBuah((prevData) => prevData.filter((item) => item.harga == formData.harga ||  ((item.nama).toLowerCase()).includes(formData.nama) || ((item.kategori).toLowerCase()).includes(formData.kategori)))
    }
    return(
        <Form onFinish={handleFilterFruit}>
            <Form.Item
                label="Harga"
                name="harga"
            >
                <Input 
                // defaultValue={0}
                />
            </Form.Item>
            <Form.Item
                label="nama"
                name="nama"
            >
                <Input />
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
            >
                Search
            </Button>
        </Form>
    )
}

export default Filter;