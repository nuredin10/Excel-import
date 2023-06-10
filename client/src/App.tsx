import React, { useState, useEffect } from 'react';
import { Button, Upload, Space, Typography, Table } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;

interface Data {
    id: number;
    itemNo: string;
    description: string;
    rate: number;
    qty: number;
    amount: number;
}

const App: React.FC = () => {
    const [data, setData] = useState<Data[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/data');
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:3000/api/data', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (key: string) => {
        console.log('Edit item with key:', key);
    };

    const handleDelete = (key: string) => {
        console.log('Delete item with key:', key);
    };

    const columns = [
        { title: 'Item No', dataIndex: 'itemNo', key: 'itemNo' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Rate', dataIndex: 'rate', key: 'rate' },
        { title: 'Qty', dataIndex: 'qty', key: 'qty' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount' },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'action',
            render: (id: number) => (
                <Space size="small">
                    <Button type="primary" onClick={() => handleEdit(id.toString())}>Edit</Button>
                    <Button type="danger" onClick={() => handleDelete(id.toString())}>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Space direction="vertical" align="center">
                <Title level={2}>Excel Import Web Application</Title>
                <Upload accept=".xlsx, .xls" showUploadList={false} beforeUpload={(file) => { handleUpload(file); return false; }}>
                    <Button icon={<UploadOutlined />} size="large">Upload Excel File</Button>
                </Upload>
                <Table columns={columns} dataSource={data} rowKey="id" />
            </Space>
        </div>
    );
};

export default App;
