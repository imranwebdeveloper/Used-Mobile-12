import { RouterProvider } from "react-router-dom";
import ContextProvider from "./contexts/ContextProvider";
import router from "./routes/root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </QueryClientProvider>
  );
};

export default App;
