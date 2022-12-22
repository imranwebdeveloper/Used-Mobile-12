import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";
import GoogleIcon from "@mui/icons-material/Google";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useContext, useState } from "react";
import { registerUser } from "../utils/registerUser";

export default function SignUp() {
  const [error, setError] = useState("");
  const { googleAuthHandler } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleGoogle = () => {
    googleAuthHandler()
      .then((result) => {
        const email = result.user.email;
        const name = result.user.displayName;
        const photoURL = result.user.photoURL;
        const role = "buyer";
        const userInfo = {
          email,
          name,
          photoURL,
          role,
          isVerified: false,
          password: "",
        };
        registerUser(userInfo, setError, navigate);
      })
      .catch((err) => setError(err.message));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userInfo = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      role: data.get("radio-buttons-group"),
      isVerified: false,
      photoURL: "",
    };
    registerUser(userInfo, setError, navigate);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="First Name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <FormControl sx={{ marginTop: "1rem" }}>
            <FormLabel id="demo-radio-buttons-group-label">
              Select Your Purpose
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="seller"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="seller"
                control={<Radio />}
                label="Seller"
              />
              <FormControlLabel
                value="buyer"
                control={<Radio />}
                label="Buyer"
              />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          {error && <small className="text-red-700">{error}</small>}
          <Box sx={{ py: "1rem" }}>
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              fullWidth
              sx={{ py: ".5rem", fontWeight: "bold" }}
              onClick={handleGoogle}
            >
              Google
            </Button>
          </Box>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-blue-700">
                  Sign in
                </Link>
              </p>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
