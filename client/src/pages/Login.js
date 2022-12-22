import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import loginUser from "../utils/loginUser";
import Spinner from "../components/common/Spinner";
import { async } from "@firebase/util";

const Login = () => {
  const { setUser, googleAuthHandler } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogle = () => {
    googleAuthHandler()
      .then((result) => {
        const userInfo = { email: result.user.email };
        loginUser(userInfo, setError, setUser, navigate);
      })
      .catch((err) => setError(err.message));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const userInfo = {
      email: data.get("email"),
      password: data.get("password"),
    };
    loginUser(userInfo, setError, setUser, navigate);
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
          Sign in
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          {error && <small className="text-red-600">{error}</small>}
          <Divider />
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
          <Grid container>
            <Grid item>
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-700">
                  Sign Up
                </Link>
              </p>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
