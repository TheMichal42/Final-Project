import React, { useState, useEffect } from 'react';
import { Button, TextField, Box } from '@mui/material';

const DataForm = ({ initialValues, onSave }) => {
    const [formData, setFormData] = useState({
        Soud: '',
        Znacka: '',
        Stupen: '',
        Tag: '',
        Obsah: '',
    });

    useEffect(() => {
        if (initialValues) {
            setFormData(initialValues);
        }
    }, [initialValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                name="Soud"
                label="Soud"
                value={formData.Soud}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                name="Znacka"
                label="Značka"
                value={formData.Znacka}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                name="Stupen"
                label="Stupeň"
                value={formData.Stupen}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                name="Tag"
                label="Tag"
                value={formData.Tag}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                name="Obsah"
                label="Obsah"
                value={formData.Obsah}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
                Uložit
            </Button>
        </Box>
    );
};

export default DataForm;
