import React, { useState } from 'react';
import { Container, AppBar, Toolbar, Typography, IconButton, Fab, Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import DataList from './DataList';
import DataForm from './DataForm';
import { supabase } from './supabaseClient';

function App() {
    const [open, setOpen] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [refreshData, setRefreshData] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    // Otevření/uzavření menu
    const handleMenuOpen = (event) => setMenuAnchor(event.currentTarget);
    const handleMenuClose = () => setMenuAnchor(null);

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            setSearchTerm(e.target.value);
        }
    };

    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2
            }}
        >
            <Container 
                maxWidth="lg" 
                disableGutters 
                sx={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    flexGrow: 1,
                }}
            >
                {/* Header */}
                <AppBar 
                    position="static" 
                    sx={{
                        width: '100%', 
                        maxWidth: 'lg', 
                        borderRadius: 1, 
                        '@media (max-width: 600px)': { 
                            padding: '0 8px' 
                        },
                        '@media (min-width: 600px) and (max-width: 960px)': { 
                            padding: '0 16px' 
                        },
                    }}
                >
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen} sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={menuAnchor}
                            open={Boolean(menuAnchor)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem component="a" href="https://justice.cz/" target="_blank" onClick={handleMenuClose}>
                                Justice.cz
                            </MenuItem>
                            <MenuItem component="a" href="https://infosoud.justice.cz/InfoSoud/public/search.jsp" target="_blank" onClick={handleMenuClose}>
                                InfoSoud
                            </MenuItem>
                            <MenuItem component="a" href="https://rozhodnuti.justice.cz/" target="_blank" onClick={handleMenuClose}>
                                Rozhodnutí soudů
                            </MenuItem>
                        </Menu>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' } }}>
                            Přehled judikatury obecných soudů
                        </Typography>
                        <TextField
                            id="filled-search"
                            label="Vyhledat"
                            type="search"
                            variant="outlined"
                            onKeyPress={handleSearchKeyPress}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    '& fieldset': {
                                        borderColor: 'white',
                                        borderWidth: 2,
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'white',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'white',
                                    fontWeight: 'bold',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'white',
                                },
                            }}
                            InputLabelProps={{
                                style: { color: 'white', fontWeight: 'bold' },
                            }}
                        />
                        <IconButton color="inherit">
                            <AccountCircle />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                {/* DataList Container */}
                <Box 
                    sx={{
                        flexGrow: 2,
                        width: '100%', 
                        maxWidth: 'lg', 
                        overflow: 'auto', 
                        my: 2, 
                        px: 2
                    }}
                >
                    <DataList refreshData={refreshData} searchTerm={searchTerm} />
                </Box>

                {/* Add Button */}
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={handleOpen}
                    sx={{ position: 'fixed', bottom: 16, right: 16 }}
                >
                    <AddIcon />
                </Fab>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Přidat nový záznam</DialogTitle>
                    <DialogContent>
                        <DataForm onSave={async (newData) => {
                            try {
                                const { error } = await supabase.from('Rozsudky prvostupňové').insert([newData]);
                                if (!error) {
                                    setRefreshData((prev) => !prev);
                                    handleClose();
                                } else {
                                    alert('Nepodařilo se přidat záznam.');
                                }
                            } catch (error) {
                                console.error('Chyba:', error);
                                alert('Došlo k neočekávané chybě.');
                            }
                        }} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Zavřít</Button>
                    </DialogActions>
                </Dialog>

                {/* Footer */}
                <Box 
                    sx={{ 
                        width: '100%', 
                        maxWidth: 'lg', 
                        bgcolor: 'primary.main', 
                        color: 'white', 
                        py: 2, 
                        mt: 'auto',
                        textAlign: { xs: 'center', sm: 'left' },
                        paddingX: { xs: 1, sm: 2 },
                        fontSize: { xs: '0.75rem', sm: '1rem' }
                    }}
                >
                    <Typography variant="body2" align="center">
                        &copy; {new Date().getFullYear()} Přehled judikatury obecných soudů. Všechna práva vyhrazena.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default App;
