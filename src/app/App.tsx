import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "@/components/AppLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1, // 1分钟
    },
  },
});


const App: React.FC = () => {
  console.log(import.meta.env);

  return (
    <QueryClientProvider client={queryClient}>
      {import.meta.env.MODE === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />} >
            <Route index element={<Navigate replace to="/dashboard" />} />
            <Route path="dashboard" element={<div>Dashboard Page</div>} />
            <Route path="/bookings" element={<div>Bookings Page</div>} />
            <Route path="/bookings/:id" element={<div>Booking Details Page</div>} />
            <Route path="/checkin/:id" element={<div>Checkin Page</div>} />
            <Route path="/cabins" element={<div>Cabins Page</div>} />
            <Route path="/users" element={<div>Users Page</div>} />
            <Route path="/settings" element={<div>Settings Page</div>} />
            <Route path="/account" element={<div>Account Page</div>} />
          </Route>

          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>

      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            maxWidth: "50rem",
            fontSize: "1.4rem",
            fontFamily: "Sono",
            backgroundColor: "var(--color-grey-100)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  )
};

export default App;
