import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Grid, TextField } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, handleClose, data }) {
  const { user } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const locations = event.target.locations.value;
    const phone = event.target.phone.value;
    const brandName = `${data.brand} ${data.model} ${data.editions}`;
    const img = data.imgUrl;
    const price = data.price;
    const email = user.email;
    const userId = user._id;
    const productId = data._id;
    const bookInfo = {
      email,
      userId,
      img,
      brandName,
      price,
      locations,
      phone,
      productId,
    };
    fetch(`https://server-imranwebdeveloper.vercel.app/booked`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          toast.success("Item Booked successfully");
          handleClose();
        } else {
          toast.error("You have Already Booked this product");
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className=" mx-auto max-w-[700px] shadow">
            <form className="p-4" onSubmit={handleSubmit}>
              <h1 className="text-lg font-bold mb-4">Book Information</h1>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Name"
                    variant="filled"
                    fullWidth
                    disabled
                    defaultValue={user.name}
                    required
                    name="name"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Email"
                    variant="filled"
                    fullWidth
                    type="email"
                    disabled
                    required
                    defaultValue={user.email}
                    name="email"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Product Name"
                    variant="filled"
                    fullWidth
                    disabled
                    required
                    name="productName"
                    defaultValue={`${data.brand} ${data.model}`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Price"
                    variant="filled"
                    fullWidth
                    disabled
                    required
                    name="price"
                    defaultValue={data.price}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label=" Your Phone Number"
                    variant="standard"
                    fullWidth
                    required
                    name="phone"
                    type="text"
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Meetings Locations"
                    variant="standard"
                    fullWidth
                    required
                    name="locations"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ padding: ".5rem 4rem" }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
