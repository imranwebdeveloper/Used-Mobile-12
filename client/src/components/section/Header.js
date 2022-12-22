import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import MenuLink from "../common/MenuLink";
import img from "../../assets/imgs/favicon.png";

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { user, setUser } = useContext(AuthContext);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("usedMobileToken");
    setUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <div className=" hidden md:flex mr-1">
            <img src={img} alt="" className="w-6 h-6" />
          </div>

          <Link to="/">
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                color: "inherit",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Used|Mobile
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {user && (
                <MenuLink
                  user={user}
                  handleCloseNavMenu={handleCloseNavMenu}
                  handleLogout={handleLogout}
                />
              )}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              fontSize: "1rem",
            }}
          >
            Used | Mobile
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* Menu Link  */}
            <MenuItem onClick={handleCloseNavMenu}>
              <Link to="/">Home</Link>
            </MenuItem>
            {user && (
              <MenuLink
                user={user}
                handleCloseNavMenu={handleCloseNavMenu}
                handleLogout={handleLogout}
              />
            )}
          </Box>

          {user ? (
            <div className="hidden md:flex">
              <Box sx={{ flexGrow: 0, marginLeft: "1rem" }}>
                <Tooltip title={user.name}>
                  <IconButton sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            </div>
          ) : (
            <MenuItem>
              <Link to="/login">Login</Link>
            </MenuItem>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
