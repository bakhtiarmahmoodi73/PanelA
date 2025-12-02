// src/App.tsx
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { store } from "./store";
import { darkTheme } from "./themes/darkTheme";
import Layout from "./components/Layout";
import LoginCard from "./pages/LoginCard";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ChangePasswordPage from "./pages/ChangePassword";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<div>Dashboard</div>} />
              <Route path="/auth/login" element={<LoginCard />} />{" "}
              {/* اضافه کنید */}
              <Route path="/auth/register" element={<RegisterPage />} />{" "}
              <Route
                path="/auth/forgot-password"
                element={<ForgotPasswordPage />}
              />
              <Route
                path="/auth/change-password"
                element={<ChangePasswordPage />}
              />{" "}
              <Route path="/about" element={<div>About Page</div>} />
              <Route path="/contact" element={<div>Contact Page</div>} />
              <Route path="/blog" element={<div>Blog Page</div>} />
              <Route path="/faq" element={<div>FAQ Page</div>} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
