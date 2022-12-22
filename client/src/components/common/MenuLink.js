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
            <Link to="/dashboard/my-products">My Product</Link>
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>
            <Link to="/dashboard/add-product">Add Product</Link>
          </MenuItem>
        </>
      )}
      {/* Buyer Link  */}
      {user.role === "buyer" && (
        <>
          <MenuItem onClick={handleCloseNavMenu}>
            <Link to="/dashboard/my-orders">My Orders</Link>
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>
            <Link to="/dashboard/my-wishList">My Wishlist</Link>
          </MenuItem>
        </>
      )}
      {/* Admin Link  */}
      {user.role === "admin" && (
        <>
          <MenuItem onClick={handleCloseNavMenu}>
            <Link to="/dashboard/all-sellers">All Sellers</Link>
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>
            <Link to="/dashboard/all-buyers">All Buyers</Link>
          </MenuItem>
        </>
      )}

      <MenuItem onClick={handleLogout}>
        <Typography textAlign="center">Logout</Typography>
      </MenuItem>
    </>
  );
};

export default MenuLink;
