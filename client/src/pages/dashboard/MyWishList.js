import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, ButtonGroup, Typography } from "@mui/material";
import Spinner from "../../components/common/Spinner";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const MyWishList = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["my-wishlist"],
    queryFn: async () => {
      const res = await fetch(
        `https://server-imranwebdeveloper.vercel.app/my-wishlist/${user._id}`
      );
      const myWishlists = await res.json();
      const data = myWishlists.wishlist;
      return data;
    },
  });

  if (isLoading) {
    return <Spinner />;
  }
  console.log(data);

  return (
    <div className="min-h-screen max-w-3xl mx-auto mt-8">
      {!data ? (
        <h1 className="text-center md:text-2xl">You hove no wishlist List</h1>
      ) : (
        <>
          <Typography
            variant="h4"
            fontWeight={"bold"}
            align="center"
            mb={2}
            gutterBottom
          >
            ALL Wishlist
          </Typography>
          <div className=" mx-auto">
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="medium"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="left"> Product Info </TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data &&
                    data.map((row, i) => (
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          padding: "1rem",
                        }}
                      >
                        <TableCell
                          component="th"
                          align="left"
                          scope="row"
                          sx={{ fontWeight: "bold" }}
                        >
                          {row.brandName}
                        </TableCell>
                        <TableCell align="center">{row.price}</TableCell>
                        <TableCell align="center">
                          <ButtonGroup
                            variant="contained"
                            aria-label="outlined primary button group"
                          >
                            {!row.isVerified && (
                              <Button
                                variant="contained"
                                onClick={() =>
                                  navigate(`/pay/${row.productId}`)
                                }
                              >
                                Buy
                              </Button>
                            )}
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default MyWishList;
