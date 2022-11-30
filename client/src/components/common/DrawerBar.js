import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Link } from "react-router-dom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HailIcon from "@mui/icons-material/Hail";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const DrawerBar = () => {
  return (
    <div>
      <Link to="/dashboard/add-product">
        <ListItemButton>
          <ListItemIcon>
            <PlaylistAddIcon />
          </ListItemIcon>
          <ListItemText primary="Add Product" />
        </ListItemButton>
      </Link>
      <Link to="/dashboard/my-products">
        <ListItemButton>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="My Products" />
        </ListItemButton>
      </Link>

      <Link to="/dashboard/all-buyers">
        <ListItemButton>
          <ListItemIcon>
            <ManageAccountsIcon />
          </ListItemIcon>
          <ListItemText primary="All Buyers" />
        </ListItemButton>
      </Link>
      <Link to="/dashboard/all-sellers">
        <ListItemButton>
          <ListItemIcon>
            <HailIcon />
          </ListItemIcon>
          <ListItemText primary="All Sellers" />
        </ListItemButton>
      </Link>
      <Link to="/dashboard/my-orders">
        <ListItemButton>
          <ListItemIcon>
            <ShoppingBagIcon />
          </ListItemIcon>
          <ListItemText primary="My Orders" />
        </ListItemButton>
      </Link>
      <Link to="/dashboard/my-wishList">
        <ListItemButton>
          <ListItemIcon>
            <BookmarkAddedIcon />
          </ListItemIcon>
          <ListItemText primary="My WishList" />
        </ListItemButton>
      </Link>
    </div>
  );
};

export default DrawerBar;
