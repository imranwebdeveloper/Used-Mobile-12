import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/section/Footer";
import Header from "../components/section/Header";

const Dashboard = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
