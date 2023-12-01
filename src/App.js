import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "./components/header.js";
import Footer from "./components/footer.js";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner.js";
import Typed from "typed.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Lottie from "lottie-react";
import animationData from "./logoAnim.json";
import aboutAnim from "./aboutAnim.json";
import { Box, Paper, List, ListItem, ListItemText } from "@mui/material";
import creatorAnim from "./creatorAnim.json";
import backgroundImage from "./backgroundImage.json";

// import Splash from "./splash.js";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const backendURL = "https://qr-magic-backend.onrender.com"; 
  const storedText = sessionStorage.getItem("enteredURL") || "";
  const [text, setText] = useState(storedText);
  const [qrCodeURL, setQRCodeURL] = useState("");
  const [downloadURL, setDownloadURL] = useState(null);
  const [qrCodeGenerated, setQRCodeGenerated] = useState(false);

  const [loading, setLoading] = useState(true);

  const openProjectsLink = () => {
    // Replace the URL with your actual projects link
    const projectsLink = "https://hardikdaim.netlify.app/";
    window.open(projectsLink, "_blank");
  };

  useEffect(() => {
    // Simulate an asynchronous operation (e.g., fetching data) with a timeout
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the timeout duration as needed

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  const [loadingGenerateQR, setLoadingGenerateQR] = useState(false);


  const generateQRCode = async () => {
    if (text.trim() === "") {
      // Alert the user to enter a URL
      alert("Please enter a URL before generating a QR code.");
    } else {
      // Set loading state to true while waiting for the response
      setLoadingGenerateQR(true);
  
      try {
        const response = await axios.post(
          `${backendURL}/generate_qr_code`,
          { data: text }
        );
  
        // Set the QR code URL from the response
        setQRCodeURL(`${backendURL}/qrcodes/${response.data.filename}`);
        // Set the flag to indicate that the QR code has been generated
        setQRCodeGenerated(true);
      } catch (error) {
        console.error("Error generating QR code:", error.message);
        // Handle the error, e.g., show an error message to the user
      } finally {
        // Set loading state to false after the response is received
        setLoadingGenerateQR(false);
      }
    }
  };
  
  const downloadQRCode = () => {
    if (qrCodeURL) {
      setDownloadURL(`/download_qr_code/${encodeURIComponent("qr_code.png")}`);
    }
  };

  useEffect(() => {
    sessionStorage.setItem("enteredURL", text);
  }, [text]);

  useEffect(() => {
    // When downloadURL changes, trigger the download
    if (downloadURL) {
      const link = document.createElement("a");
      link.href = downloadURL;
      link.download = "qr_code.png";
      link.click();
      // Reset the downloadURL to prevent re-downloading the same file
      setDownloadURL(null);
    }
  }, [downloadURL]); // Add qrCodeURL to the dependency array

  const typedTextRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: ["QR Code Generator"],
      typeSpeed: 150, // Typing speed in milliseconds
      backSpeed: 25, // Backspacing speed in milliseconds
      loop: true, // Infinite looping
    };

    const typed = new Typed(typedTextRef.current, options);

    return () => {
      // Clean up the Typed.js instance when the component unmounts
      typed.destroy();
    };
  }, []);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <div>
          <Header />
          {/* Main Portion */}
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{
              minHeight: "90vh",
              position: "relative",
              overflow: "hidden", // Ensure the Lottie animation doesn't overflow
            }}
          >
            {/* Lottie Animation */}
            <Box position="absolute" width="100%" height="100%" zIndex="-1">
              <Lottie
                animationData={backgroundImage}
                height="100%"
                width="100%"
              />
            </Box>

            <Grid item xs={12} sm={10} md={8} lg={6}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "200px", height: "200px" }}>
                  <Lottie animationData={animationData} />
                </div>
                <Typography
                  variant="h4"
                  align="center"
                  gutterBottom
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "transparent",
                    background:
                      "linear-gradient(to right, #add8e6, #ffc0cb, #fffacd)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    marginTop: "20px",
                  }}
                >
                  <span ref={typedTextRef}></span>
                </Typography>
              </div>

              <TextField
                required
                id="outlined-required"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste the URL to Generate the QR Code"
                fullWidth
                sx={{
                  marginTop: { xs: 2, md: 3 }, // Adjust the margin for different screen sizes
                }}
              />

              <Button
                variant="contained"
                sx={{
                  fontWeight: 700,
                  backgroundColor: "#fff",
                  color: "black",
                  marginTop: 2,
                  width: "100%",
                }}
                onClick={generateQRCode}
                disabled={loadingGenerateQR} // Disable the button when loading
              >
                {loadingGenerateQR ? "Generating..." : "Generate QR Code"}
              </Button>

              {qrCodeGenerated && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                    marginTop: "3rem",
                    marginBottom: "3rem",
                  }}
                >
                  <img
                    src={qrCodeURL}
                    alt="QR Code"
                    style={{ maxWidth: "100%" }}
                  />
                  <a
                    href={qrCodeURL}
                    download="qr_code.png"
                    className="bg-green-600 text-white rounded-lg mt-2 font-medium text-sm px-5 py-2"
                    onClick={downloadQRCode}
                  >
                    Download QR Code
                  </a>
                </div>
              )}
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            sx={{ backgroundColor: "#1E1E1E" , padding: "20px"}}
          >
            <Grid item xs={12} lg={6}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "transparent",
                  background:
                    "linear-gradient(to right, #add8e6, #ffc0cb, #fffacd)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  marginTop: "20px",
                }}
              >
                More about QR Magic
              </Typography>
              <Typography sx={{ fontFamily: "monospace" }}>
                Experience the convenience of instant QR code creation with QR
                Magic, the cutting-edge web app designed and developed by{" "}
                <strong>Hardik Daim</strong>. Whether you're a business owner,
                marketer, event organizer, or just someone looking to make life
                easier, QR Magic is your go-to solution.
              </Typography>
              <Typography sx={{ fontFamily: "monospace" }}>
                Effortlessly generate QR codes for websites, contact
                information, Wi-Fi networks, events, and more in just a few
                clicks. Customize your QR codes with a range of design options
                to match your brand or personal style. QR Magic ensures seamless
                compatibility with smartphones and QR code scanners, making it
                easy for your audience to access the information you want to
                share.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              lg={6}
              container
              justifyContent="center"
              alignItems="center"
            >
              <Paper style={{ width: "70%" }}>
                {/* Assuming Lottie is a Material-UI component */}
                <Lottie animationData={aboutAnim} />
              </Paper>
            </Grid>
          </Grid>

          <Typography
            variant="h5"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              color: "transparent",
              background: "linear-gradient(to right,  #ffc0cb, #fffacd)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              // marginTop: "20px",
              padding: "20px"
            }}
          >
            Key Features
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="1. Quick and Easy:"
                secondary="Generate QR codes instantly with a user-friendly interface."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="2. Versatile Code Types:"
                secondary="Create QR codes for URLs, contact cards, Wi-Fi credentials, and various other data types."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="3. Customization:"
                secondary="Tailor your QR codes with color, logo, and design options to reflect your brand identity."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="4. High Resolution:"
                secondary="Download high-quality QR codes suitable for print and digital use."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="5. Scan Anywhere:"
                secondary="Ensure compatibility with popular QR code scanners on smartphones."
              />
            </ListItem>
          </List>

          <Grid
            container
            alignItems="center"
            sx={{ backgroundColor: "#1E1E1E",  padding: "20px" }}
          >
            <Grid item xs={12} lg={6}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "transparent",
                  background:
                    "linear-gradient(to right, #add8e6, #ffc0cb, #fffacd)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  marginTop: "20px",
                }}
              >
                About the Creator
              </Typography>
              <Typography sx={{ fontFamily: "monospace" }}>
                My name is <strong>Hardik Daim</strong>. I am pursuing a
                Bachelor's degree in{" "}
                <strong>Computer Science and Engineering</strong> , and I am
                currently in my second year at CGC Landran, Mohali.
              </Typography>
              <Typography sx={{ fontFamily: "monospace" }}>
                I am a currently learning Software Engineering and MERN Stack
                Development, consistently dedicated to expanding my skill set
                through continuous learning. I have prior experience managing a
                Team for making an amazing Project in the Smart India
                Hackathon-2023. Additionally, I've made many nore interesting
                projects for my practice and expanding my skills and knowledge.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              lg={6}
              container
              justifyContent="center"
              alignItems="center"
            >
              <Paper style={{ width: "70%" }}>
                {/* Assuming Lottie is a Material-UI component */}
                <Lottie animationData={creatorAnim} />
              </Paper>
            </Grid>
          </Grid>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              color: "transparent",
              background:
                "linear-gradient(to right, #add8e6, #ffc0cb, #fffacd)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              // marginTop: "20px",
              padding: "20px"
            }}
          >
            More Projects ?
          </Typography>
          <Typography sx={{ fontFamily: "monospace", padding: "20px" }}>
            To see my complete background and all my Projects I've created till
            now click on the button given below.
          </Typography>
          <div className="d-flex align-items-center justify-center">
            <Button
              variant="contained"
              sx={{
                fontWeight: 700,
                backgroundColor: "#fff",
                color: "black",
                marginTop: 2, // Adjust the margin for small screens
                // width: "100%",
              }}
              onClick={openProjectsLink}
            >
              My Projects
            </Button>
          </div>

          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
