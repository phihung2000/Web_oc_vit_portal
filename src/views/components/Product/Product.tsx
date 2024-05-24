import React from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useStyles from "./Product.styles";

const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'nameProduct',
        headerName: 'Tên sản phẩm',
        width: 150,
        editable: true,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'imageProduct',
        headerName: 'Hình ảnh',
        minWidth: 130,
        flex: 1,
        editable: true,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => (
            <img src={'https://bizweb.dktcdn.net/100/182/217/files/hinh-anh-bu-long-oc-vit-01.jpg?v=1594452213671'} alt={'image'} style={{ width: 290, height: 290, objectFit: 'contain' }} />
          )
    },
    {
        field: 'category',
        headerName: 'Loại sản phẩm',
        type: 'number',
        width: 110,
        editable: true,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'delete',
        headerName: 'Xoá sản phẩm',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => (
            <DeleteIcon color="error" style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', width: '100%' }} />
          )
    },
    {
        field: 'edit',
        headerName: 'Sửa sản phẩm',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => (
            <EditIcon color="warning" style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', width: '100%' }} />
          )
    },
];

const rows = [
    { id: 1, imageProduct: 'Snow', nameProduct: 'Jon', category: 14 },
    { id: 2, imageProduct: 'Lannister', nameProduct: 'Cersei', category: 31 },
    { id: 3, imageProduct: 'Lannister', nameProduct: 'Jaime', category: 31 },
    { id: 4, imageProduct: 'Stark', nameProduct: 'Arya', category: 11 },
    { id: 5, imageProduct: 'Targaryen', nameProduct: 'Daenerys', category: null },
    { id: 6, imageProduct: 'Melisandre', nameProduct: null, category: 150 },
    { id: 7, imageProduct: 'Clifford', nameProduct: 'Ferrara', category: 44 },
    { id: 8, imageProduct: 'Frances', nameProduct: 'Rossini', category: 36 },
    { id: 9, imageProduct: 'Roxie', nameProduct: 'Harvey', category: 65 },
];

const Product = () => {
    const {classes} = useStyles()
    return (
        <Box className={classes.root}>
            <div className={classes.contentButton}>
                <Button variant="contained" color="success" className={classes.buttonAdd}>Thêm sản phẩm</Button>
            </div>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[20]}
                checkboxSelection
                disableRowSelectionOnClick
                rowHeight={200}
                autoHeight
            />
        </Box>
    )
};
export default Product;