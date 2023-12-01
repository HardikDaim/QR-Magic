import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1E1E1E",
        color: "#fff",
        padding: "20px 0",
        marginTop: "50px",
        bottom: 0,
        width: "100%",
        display: 'flex',
        justifyContent: 'center',
        boxShadow: "0px -4px 6px -1px rgba(0,0,0,0.2), 0px -2px 16px 1px rgba(0,0,0,0.14), 0px 2px 8px 0px rgba(0,0,0,0.12);"
      }}
    >
      <Container sx={{ maxWidth: "1200px", display: 'flex', justifyContent: 'space-between' }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
          <QrCodeScannerIcon sx={{ mr: 1 }} />

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
           
              fontFamily: 'monospace',
              fontWeight: 700,
             
              color: 'inherit',
              textDecoration: 'none',
            }}
            style={{color: "transparent",
            background: "linear-gradient(to right, #add8e6, #ffc0cb, #fffacd)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",}}
          >
            QR Magic
          </Typography>
            {/* <Typography variant="body1">
              First Link
            </Typography>
            <Typography variant="body1">
              Second Link
            </Typography>
          </Grid>
          <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1">
              Third Link
            </Typography>
            <Typography variant="body1">
              Fourth Link
            </Typography> */}
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography variant="body2">
              ©{currentYear} Made with ❤️ by <i><strong>Hardik Daim</strong></i>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
