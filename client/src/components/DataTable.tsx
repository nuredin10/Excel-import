import React from 'react';
import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface DataItem {
    key: string;
    itemNo: string;
    description: string;
    rate: number;
    qty: number;
    amount: number;
}

interface DataTableProps {
    data: DataItem[];
    onEdit: (key: string) => void;
    onDelete: (key: string) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, onEdit, onDelete }) => {
    const columns = [
        {
            title: 'Item No',
            dataIndex: 'itemNo',
            key: 'itemNo',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Rate',
            dataIndex: 'rate',
            key: 'rate',
        },
        {
            title: 'Qty',
            dataIndex: 'qty',
            key: 'qty',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_: any, record: DataItem) => (
                <>
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => onEdit(record.key)}
                    />
                    <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => onDelete(record.key)}
                    />
                </>
            ),
        },
    ];

    return <Table dataSource={data} columns={columns} />;
};

export default DataTable;
