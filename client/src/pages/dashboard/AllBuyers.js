import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/common/Spinner";
import toast from "react-hot-toast";

const AllBuyers = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["buyer"],
    queryFn: async () => {
      const res = await fetch(
        "https://server-imranwebdeveloper.vercel.app/all-buyer"
      );
      const buyers = await res.json();
      const data = buyers.buyer;
      return data;
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  const handleDelete = (id) => {
    fetch(`https://server-imranwebdeveloper.vercel.app/buyer/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          toast.success("Buyer Delete successfully");
          refetch();
          console.log(result);
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className="min-h-screen mt-8">
      <Typography variant="h4" fontWeight={"bold"} mb={2} gutterBottom>
        All Buyers
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell> Buyer Name </TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow
                key={i}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  padding: "1rem",
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => handleDelete(row._id)}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllBuyers;
