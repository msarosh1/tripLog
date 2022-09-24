import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import NearMeIcon from "@mui/icons-material/NearMe";
import { Grid } from "@mui/material";
import Destinations from "../destinations/Destinations";
import { getDestinations } from "../../apis/dataApis";
import MapBox from "./maps/MapBox";

const Main = styled("main")(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: 0,
  marginRight: 50,
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const useStyles = makeStyles(() => ({
  mapWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    color: "#9F9C9B",
    fontSize: 15,
    margin: "8px 0px 12px",
  },

  logoutBtn: {
    fontWeight: "800",
    color: "white",
    border: "0px solid white",
    "&:hover": {
      color: "#00489E",
      backgroundColor: "#fff",
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState();
  const [selectedAddress, setSelectedAddress] = useState();

  useEffect(() => {
    setDestinations([
      {
        id: 1,
        description: "Planning to go there next summer",
        address: "Wake Forest, North Carolina, United States",
      },
      {
        id: 2,
        description: "Description 2",
        address: "Address 2",
      },
      {
        id: 3,
        description: "Description 2",
        address: "Address 3",
      },
      {
        id: 4,
        description: "Description 1",
        address: "Address 1",
      },
      {
        id: 5,
        description: "Description 2",
        address: "Address 2",
      },
      {
        id: 6,
        description: "Description 2",
        address: "Address 3",
      },
    ]);
  }, []);

  useEffect(() => {}, [selectedAddress]);

  const handleGetAddressCallback = (address) => {
    setSelectedAddress(address);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <MuiAppBar position="fixed">
          <Toolbar
            style={{
              backgroundColor: "#00489E",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <NearMeIcon
                style={{
                  marginTop: 2,
                  marginRight: 4,
                  height: "30px",
                  width: "30px",
                }}
              />
              <Typography variant="p" noWrap component="div">
                DESTINATION NEXT
              </Typography>
            </div>

            <Button
              variant="outlined"
              style={{
                fontWeight: "800",
                color: "white",
                border: "0px solid white",
                "&:hover": {
                  color: "#00489E",
                  backgroundColor: "#fff",
                },
              }}
              className={classes.logoutBtn}
              sx={{ mt: 2, mb: 2 }}
              onClick={() => {
                navigate("/");
                toast.warning("Logged out successfully", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </MuiAppBar>
        <Main>
          <DrawerHeader />
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, md: 12 }}
            justifyContent={"center"}
            sx={{
              height: "calc(100vh - 100px)",
              overflowX: "hidden",
            }}
          >
            {destinations ? (
              <Grid item xs={3.5} md={3.5}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#014493",
                    borderBottom: "1px solid #00498E",
                    paddingBottom: 0,
                  }}
                >
                  <h3 style={{ marginBottom: 3 }}>Your list</h3>
                </div>
                <span style={{ display: "flex", justifyContent: "flex-end" }}>
                  {" "}
                  <h6 className={classes.heading}>
                    <span style={{ fontSize: 24, color: "#00489E" }}>
                      {destinations ? destinations?.length : 0}&nbsp;
                    </span>
                    destinations found
                  </h6>
                </span>

                <Destinations
                  destinations={destinations}
                  handleGetAddressCallback={handleGetAddressCallback}
                />
              </Grid>
            ) : null}

            <Grid item xs={8} md={8}>
              <div className={classes.mapWrapper}>
                <MapBox selectedAddress={selectedAddress} />
              </div>
            </Grid>
          </Grid>
        </Main>
      </Box>
    </>
  );
}
