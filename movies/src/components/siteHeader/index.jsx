import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import tmdbLogo from '../../images/tmdb.png';
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Spacer to push content below the fixed AppBar
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  // Manage drawer and mobile menu state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // Detect screen width for responsive UI
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // Navigation helper
  const navigate = useNavigate();
  // Open/close favorites drawer
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // Drawer links for quick access to lists
  const drawerList = (
    <List sx={{ width: 250 }}>
      <ListItem
        button
        onClick={() => { navigate("/movies/favorites"); setDrawerOpen(false); }}
        sx={{
          "&:hover": {
            backgroundColor: "#032541",
            color: "#00bfff",
            cursor: "pointer",
          },
        }}
      >
        <ListItemText primary="Favorites" />
      </ListItem>

      <ListItem
        button
        onClick={() => { navigate("/movies/mustwatch"); setDrawerOpen(false); }}
        sx={{
          "&:hover": {
            backgroundColor: "#032541",
            color: "#00bfff",
            cursor: "pointer",
          },
        }}
      >
        <ListItemText primary="Must Watch" />
      </ListItem>
    </List>
  );

  // Main menu navigation structure
  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Top Rated", path: "/movies/top-rated" },
    { label: "Now Playing", path: "/movies/now-playing" },
  ];

  const handleMenuSelect = (pageURL) => {
    // Close menu popup
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      {/* Main top navigation bar */}
      <AppBar
        position="fixed"
        sx={{
          background: '#032541',
          boxShadow: '0px 2px 8px rgba(0,0,0,0.2)',
        }}>
        <Toolbar sx={{ display: "flex", justifyContent: "flex-start" }}>
          {/* TMDB logo navigates home */}
          <img
            src={tmdbLogo}
            alt="TMDB Logo"
            style={{ height: 45, width: 180, cursor: 'pointer' }}
            onClick={() => navigate("/")} />

          {isMobile ? (
            <>

              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit">
                <MenuIcon />
              </IconButton>

              {/* Mobile pop-out menu */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}>

                {menuOptions.map((opt) => (

                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {/* Desktop navigation buttons */}
              <div style={{ display: "flex", gap: "10px" }}>
                {menuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    sx={{
                      fontWeight: '400',
                      fontSize: '1rem',
                      letterSpacing: '0.5px',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        borderRadius: 1
                      },
                      mx: 1
                    }}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
            </>
          )}
          {/* Push favorites icon to far right */}
          <div style={{ flexGrow: 1 }} />
          {/* Open favorites/must watch drawer */}
          <IconButton aria-label="open drawer" onClick={toggleDrawer(true)}
            sx={{
              color: "white",
              ml: 2,
              "&:hover": {
                backgroundColor: "#032541",
                color: "#00bfff",
              },
            }}
          >
            <FavoriteIcon />
          </IconButton>
        </Toolbar>
        {/* Sliding drawer for favorites & must-watch navigation */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              backgroundColor: "#032541",
              color: "white",
            },
          }}
        >
          {drawerList}
        </Drawer>

      </AppBar>
      {/* Pushes page content below fixed app bar */}
      <Offset />
    </>
  );
};

export default SiteHeader;
