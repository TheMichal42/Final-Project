import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Container, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DataForm from './DataForm';

const DataList = ({ refreshData, searchTerm }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editRow, setEditRow] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteRowId, setDeleteRowId] = useState(null);

    // Načítání dat s filtrováním podle searchTerm
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            let query = supabase.from('Rozsudky prvostupňové').select('*');
            if (searchTerm) {
                query = query.ilike('Obsah', `%${searchTerm}%`);
            }
            
            const { data, error } = await query;

            if (error) {
                setError('Chyba při načítání dat: ' + error.message);
            } else {
                setData(data);
            }
            setLoading(false);
        };

        fetchData();
    }, [refreshData, searchTerm]);

    const handleEditClick = (row) => {
        setEditRow(row);
        setOpenEditDialog(true);
    };

    const handleDeleteClick = (id) => {
        setDeleteRowId(id);
        setOpenDeleteDialog(true);
    };

    const confirmDelete = async () => {
        const { error } = await supabase.from('Rozsudky prvostupňové').delete().eq('ID', deleteRowId);
        if (error) {
            console.error('Chyba při mazání záznamu:', error);
        } else {
            fetchData();
        }
        setOpenDeleteDialog(false);
        setDeleteRowId(null);
    };

    const handleEditSave = async (updatedData) => {
        const { error } = await supabase.from('Rozsudky prvostupňové').update(updatedData).eq('ID', editRow.ID);
        if (error) {
            console.error('Chyba při úpravě záznamu:', error);
        } else {
            fetchData();
            setOpenEditDialog(false);
            setEditRow(null);
        }
    };

    if (loading) return <Typography>Načítání dat...</Typography>;
    if (error) return <Typography>{error}</Typography>;

    const columns = [
        { field: 'Soud', headerName: 'Soud', flex: 1 },
        { field: 'Znacka', headerName: 'Spisová značka', flex: 0.7 },
        { field: 'Stupen', headerName: 'Stupeň', flex: 0.4 },
        { field: 'Tag', headerName: 'Tag', flex: 0.7 },
        {
            field: 'Obsah',
            headerName: 'Obsah',
            flex: 0.7,
            renderCell: (params) => (
                <a href="#" onClick={() => window.open(`/detail/${params.row.ID}`, '_blank')}>
                    Zobrazit obsah
                </a>
            ),
        },
        {
            field: 'actions',
            headerName: 'Akce',
            flex: 0.5,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleEditClick(params.row)} color="primary">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(params.row.ID)} color="secondary">
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    height: '80vh',
                    width: '90vw',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto',
                    flexGrow: 1,
                    flexShrink: 1,
                }}
            >
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    getRowId={(row) => row.ID}
                    disableSelectionOnClick
                    
                    sx={{
                        minWidth: 300,
                        width: '100%',
                        '& .MuiDataGrid-root': {
                            overflow: 'auto',
                        },
                    }}
                />
            </Box>

            {/* Dialogy pro úpravu a mazání záznamů */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Upravit záznam</DialogTitle>
                <DialogContent>
                    <DataForm initialValues={editRow} onSave={handleEditSave} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)} color="primary">Zavřít</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Potvrdit smazání</DialogTitle>
                <DialogContent>
                    <Typography>Opravdu chcete smazat tento záznam? Tato akce je nevratná.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">Zrušit</Button>
                    <Button onClick={confirmDelete} color="secondary">Smazat</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default DataList;
