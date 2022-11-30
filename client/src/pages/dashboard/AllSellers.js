import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/common/Spinner";
import toast from "react-hot-toast";

const AllSellers = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["all-seller"],
    queryFn: async () => {
      const res = await fetch(
        "https://server-imranwebdeveloper.vercel.app/all-seller",
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("usedMobileToken")}`,
          },
        }
      );
      const sellers = await res.json();
      const data = sellers.seller;
      return data;
    },
  });

  const handleVerify = (id) => {
    fetch(`https://server-imranwebdeveloper.vercel.app/seller/verify/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          toast.success("Seller Verified successfully");
          refetch();
        }
      })
      .catch((err) => console.log(err.message));
  };

  const handleDelete = (id) => {
    fetch(`https://server-imranwebdeveloper.vercel.app/seller/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          toast.success("Seller Delete successfully");
          refetch();
          console.log(result);
        }
      })
      .catch((err) => console.log(err.message));
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="min-h-screen mt-8">
      <Typography variant="h4" fontWeight={"bold"} mb={2} gutterBottom>
        All Sellers
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell> Name </TableCell>
              <TableCell align="center"> Email </TableCell>
              <TableCell align="center">Status</TableCell>
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
                    scope="row"
                    sx={{ fontWeight: "bold" }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">
                    {row.isVerified ? "Verified" : "Unverified"}
                  </TableCell>
                  <TableCell align="center">
                    <ButtonGroup
                      variant="contained"
                      aria-label="outlined primary button group"
                    >
                      {!row.isVerified && (
                        <Button
                          variant="contained"
                          onClick={() => handleVerify(row._id)}
                        >
                          Verify
                        </Button>
                      )}
                      <Button
                        onClick={() => handleDelete(row._id)}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllSellers;
