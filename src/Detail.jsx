import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { Container, Typography, Box, Paper } from '@mui/material';

const Detail = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            const { data, error } = await supabase
                .from('Rozsudky prvostupňové')
                .select('*')
                .eq('ID', id)
                .single();

            if (error) {
                setError('Chyba při načítání detailu: ' + error.message);
            } else {
                setItem(data);
            }

            setLoading(false);
        };

        fetchDetail();
    }, [id]);

    if (loading) return <Typography>Načítání detailu...</Typography>;
    if (error) return <Typography>{error}</Typography>;

    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <Paper elevation={3} sx={{ p: 3, borderRadius: 2, width: '60%' }}>
                    <Typography variant="h5" gutterBottom align="center">
                        Detail záznamu
                    </Typography>
                    <Typography variant="body1" align="center">ID: {item.ID}</Typography>
                    <Typography variant="body1" align="center">Soud: {item.Soud}</Typography>
                    <Typography variant="body1" align="center">Značka: {item.Znacka}</Typography>
                    <Typography variant="body1" align="center">Stupeň: {item.Stupen}</Typography>
                    <Typography variant="body1" align="center">Tag: {item.Tag}</Typography>
                    <Typography 
                        variant="body1" 
                        align="left" 
                        sx={{ mt: 2, whiteSpace: 'pre-line', textAlign: 'justify' }}
                    >
                        {item.Obsah}
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default Detail;
