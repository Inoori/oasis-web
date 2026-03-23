import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Cabins from "@/pages/Cabins";
import Bookings from "@/pages/Bookings";
import Layout from "@/components/Layout";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/components/theme-provider";
import BookingDetail from "@/features/bookings/BookingDetail";
import Checkin from "./pages/Checkin";
import PageNotFound from "./pages/PageNotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1, // 1分钟
    },
  },
});

const App: React.FC = () => {
  if (import.meta.env.MODE === "development") console.log(import.meta.env);

  return (
    <QueryClientProvider client={queryClient}>
      {import.meta.env.MODE === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      <ThemeProvider defaultTheme="dark" storageKey="oasis-ui-theme">
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Navigate replace to="/dashboard" />} />
                <Route path="dashboard" element={<div>Dashboard Page</div>} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/bookings/:id" element={<BookingDetail />} />
                <Route path="/bookings/:id/checkin" element={<Checkin />} />
                <Route path="/cabins" element={<Cabins />} />
                <Route path="/users" element={<div>Users Page</div>} />
                <Route path="/settings" element={<div>Settings Page</div>} />
                <Route path="/account" element={<div>Account Page</div>} />
              </Route>

              <Route path="/login" element={<div>Login Page</div>} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        // draggable
        pauseOnHover
        theme="dark"
        style={{
          fontFamily: "Sono",
          fontSize: "0.9rem",
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
