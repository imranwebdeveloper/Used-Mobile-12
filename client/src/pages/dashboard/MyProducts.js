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
import toast from "react-hot-toast";
import Spinner from "../../components/common/Spinner";

const MyProducts = () => {
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        "https://server-imranwebdeveloper.vercel.app/my-products",
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("usedMobileToken")}`,
          },
        }
      );
      const products = await res.json();
      return products;
    },
  });

  const handleAdvertise = (id) => {
    fetch(
      `https://server-imranwebdeveloper.vercel.app/product/advertise/${id}`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          toast.success("Product Advertised successfully");
          refetch();
        }
      })
      .catch((err) => console.log(err.message));
  };
  const handleDelete = (id) => {
    fetch(`https://server-imranwebdeveloper.vercel.app/product/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          toast.success(" Product Delete successfully");
          refetch();
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="min-h-screen mt-8">
      <Typography variant="h4" fontWeight={"bold"} mb={2} gutterBottom>
        My Products
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell> Product Name </TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Ads Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell>
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : (
              products.products.map((product) => (
                <TableRow
                  key={product._id}
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
                    <Typography variant="h6" gutterBottom>
                      {product.brand} {product.model}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{product.price} tk</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {product.isSold ? "Sold" : "Available"}
                  </TableCell>
                  <TableCell align="center">
                    {product.isAdvertised ? (
                      <p className="text-green-600">Advertised</p>
                    ) : (
                      <Button
                        variant="outlined"
                        onClick={() => handleAdvertise(product._id)}
                      >
                        Click to Ads
                      </Button>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => handleDelete(product._id)}
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyProducts;
