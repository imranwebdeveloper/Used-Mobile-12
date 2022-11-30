import React from "react";
import Footer from "../components/section/Footer";
import Header from "../components/section/Header";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

const Main = () => {
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

export default Main;
