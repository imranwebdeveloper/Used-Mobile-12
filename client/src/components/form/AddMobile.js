import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContextProvider";

const AddMobile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [condition, setCondition] = useState("");
  const key = process.env.REACT_APP_IMG_API_KYE;
  const url = `https://api.imgbb.com/1/upload?key=${key}`;

  const handleChange = (event) => {
    setCondition(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const brand = event.target.brand.value;
    const model = event.target.model.value;
    const editions = event.target.editions.value;
    const price = event.target.price.value;
    const originalPrice = event.target.originalPrice.value;
    const descriptions = event.target.descriptions.value;
    const locations = event.target.locations.value;
    const usedOfYear = event.target.usedOfYear.value;
    const phoneNumber = event.target.phoneNumber.value;
    const img = event.target.img.files[0];

    const formData = new FormData();
    formData.append("image", img);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const imgUrl = data.data.url;
        const newData = {
          postDate: new Date(),
          email: user.email,
          userId: user._id,
          UserName: user.name,
          brand,
          model,
          editions,
          originalPrice,
          price,
          condition,
          descriptions,
          locations,
          imgUrl,
          usedOfYear,
          phoneNumber,
          isAdvertised: false,
          isSold: false,
          isVerified: false,
          isApproved: false,
        };
        fetch(
          "https://server-imranwebdeveloper.vercel.app/sellers/add-product",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${localStorage.getItem(
                "usedMobileToken"
              )}`,
            },
            body: JSON.stringify(newData),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.status) {
              toast.success("Added successfully");
              navigate("/dashboard/my-products");
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="border mx-auto max-w-[800px] shadow">
      <form className="p-4" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label="Brand Name"
              variant="standard"
              fullWidth
              required
              name="brand"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label="Modal No."
              variant="standard"
              fullWidth
              required
              name="model"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label="Editions (Exam: 12/128 GB) "
              variant="standard"
              fullWidth
              required
              name="editions"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ minWidth: 120 }} variant="filled" fullWidth>
              <InputLabel id="demo-select-small">Condition</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                label="Condition"
                name="condition"
                value={condition}
                onChange={handleChange}
              >
                <MenuItem selected value="Excellent">
                  Excellent
                </MenuItem>
                <MenuItem value="Good">Good</MenuItem>
                <MenuItem value="Fire">Fire</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label=" Original Price"
              variant="standard"
              fullWidth
              required
              name="originalPrice"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label=" Sell Price"
              variant="standard"
              fullWidth
              required
              name="price"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              variant="filled"
              type="file"
              fullWidth
              required
              name="img"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label="Used Of Year"
              variant="standard"
              fullWidth
              required
              name="usedOfYear"
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={7}
              placeholder="Descriptions"
              style={{ width: "100%", background: "white" }}
              name="descriptions"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label="Locations"
              variant="standard"
              fullWidth
              required
              name="locations"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label="Your Phone Number"
              variant="standard"
              fullWidth
              required
              name="phoneNumber"
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
  );
};

export default AddMobile;
