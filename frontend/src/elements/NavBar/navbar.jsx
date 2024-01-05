import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

const NavigationBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ backgroundColor: 'white'}}>
                <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black', fontSize: '26px', fontWeight: 'bold', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
                        Coral<Typography variant="h6" component="span" sx={{ color: 'blue',  fontSize: '20px', fontWeight: 'bold', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>App</Typography>
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Button color="secondary" sx={{ marginLeft: '10px', borderRadius: '125px', color: 'black    ',  fontSize: '20px', fontWeight: 'bold' }} >Map</Button>
                        <Button color="secondary" sx={{ marginLeft: '10px', borderRadius: '125px', color: 'blue',  fontSize: '20px', fontWeight: 'bold' }} >Projects</Button>
                        <Button color="secondary" sx={{ marginLeft: '10px', borderRadius: '125px', color: 'blue',  fontSize: '20px', fontWeight: 'bold' }} >About Us</Button>
                    </Box>
                        <Button variant="contained" sx={{ marginLeft: '10px' }} color="inherit">Login</Button>
                    
                </Toolbar>
            </AppBar>
        </Box>
    );
};
export default NavigationBar;