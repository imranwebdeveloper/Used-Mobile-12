import Typography from "@mui/material/Typography";

import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
const MenuLink = ({ user, handleCloseNavMenu, handleLogout }) => {
  return (
    <>
      {/* Seller Link  */}
      {user.role === "seller" && (
        <>
          <MenuItem onClick={handleCloseNavMenu}>
            <Link to="/dashboard/my-products">
              <Typography textAlign="center">My Product</Typography>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>
            <Link to="/dashboard/add-product">
              <Typography textAlign="center"> Add Product</Typography>
            </Link>
          </MenuItem>
        </>
      )}
      {/* Buyer Link  */}
      {user.role === "buyer" && (
        <>
          <MenuItem onClick={handleCloseNavMenu}>
            <Link to="/dashboard/my-orders">
              <Typography textAlign="center">My Orders</Typography>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>
            <Link to="/dashboard/my-wishList">
              <Typography textAlign="center">My Wishlist</Typography>
            </Link>
          </MenuItem>
        </>
      )}
      {/* Admin Link  */}
      {user.role === "admin" && (
        <>
          <MenuItem onClick={handleCloseNavMenu}>
            <Link to="/dashboard/all-sellers">
              <Typography textAlign="center">All Sellers</Typography>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>
            <Link to="/dashboard/all-buyers">
              <Typography textAlign="center">All Buyers</Typography>
            </Link>
          </MenuItem>
        </>
      )}
      <MenuItem onClick={handleCloseNavMenu}>
        <MenuItem onClick={handleCloseNavMenu}>
          <Link to="/blog">
            <Typography textAlign="center"> Blog</Typography>
          </Link>
        </MenuItem>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <Typography textAlign="center">Logout</Typography>
      </MenuItem>
    </>
  );
};

export default MenuLink;
