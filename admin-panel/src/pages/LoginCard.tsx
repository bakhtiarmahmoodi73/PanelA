import React, { useState } from "react";
import login from "../../src/assets/images/logs/login.svg";
import {
  Box,
  Card,
  TextField,
  InputAdornment,
  IconButton,
  Checkbox,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// تعریف تایپ برای form data
interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginCard: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = (e: React.FormEvent): void => {
    e.preventDefault();
    // منطق لاگین اینجا پیاده‌سازی می‌شود
    console.log("Login data:", formData);
  };

  const handleRegisterClick = (): void => {
    navigate("/auth/register");
  };

  const handleForgotPasswordClick = (e: React.MouseEvent): void => {
  e.preventDefault();
  navigate("/auth/forgot-password");
};

  return (
    <Card
      sx={{
        display: "block",
        maxWidth: "560px",
        width: "100%",
        height: "568px",
        borderRadius: "30px",
        marginTop: "157px",
        marginBottom: "152px",
        marginX: "auto",
        backgroundColor: "#2A3342",
      }}
    >
      <Box component="form" onSubmit={handleLogin}>
        <Box
          component="img"
          src={login}
          alt="Login Logo"
          sx={{
            width: "100%",
            maxWidth: "91px",
            marginTop: "32px",
            marginX: "auto",
            display: "block",
          }}
        />

        {/* ایمیل */}
        <Typography
          sx={{
            mt: "31px",
            fontWeight: 700,
            color: "#ABABAB",
            ml: "39px",
            fontSize: "16px",
          }}
        >
          Email&nbsp;:
        </Typography>

        <TextField
          fullWidth
          name="email"
          type="email"
          placeholder="Please Enter Your Email"
          value={formData.email}
          onChange={handleInputChange}
          sx={{
            display: "block",
            mt: "15px",
            width: "485px",
            marginX: "auto",
            "& .MuiOutlinedInput-root": {
              height: "57px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 700,
              color: "#FFFFFF",
              backgroundColor: "#242C39",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#FFFFFF !important",
              opacity: 1,
            },
          }}
        />

        {/* پسورد */}
        <Typography
          sx={{
            mt: "27px",
            fontWeight: 700,
            color: "#ABABAB",
            ml: "39px",
            fontSize: "16px",
          }}
        >
          Password&nbsp;:
        </Typography>
        <TextField
          fullWidth
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Please Enter Your Password"
          value={formData.password}
          onChange={handleInputChange}
          sx={{
            display: "block",
            mt: "15px",
            width: "485px",
            marginX: "auto",
            "& .MuiOutlinedInput-root": {
              height: "57px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 700,
              color: "#FFFFFF",
              backgroundColor: "#242C39",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#FFFFFF !important",
              opacity: 1,
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                  sx={{ width: "16px", height: "16px", color: "#ABABAB",mr:"21px" }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* ردیف چک‌باکس و فراموشی رمز */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* سمت چپ: چک‌باکس و متن */}
          <Box
            sx={{
              display: "flex",
              marginLeft: "39px",
            }}
          >
            {/* چک‌باکس */}
            <Checkbox
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              sx={{
                padding: 0,
                "&.Mui-checked": {
                  color: "#1976d2",
                },
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
                "& .MuiSvgIcon-root": {
                  fontSize: "18px",
                  borderRadius: "3px",
                  mt: "24px",
                  mr: "6px",
                },
              }}
            />

            {/* متن "Keep Me Login" */}
            <Typography
              component="label"
              htmlFor="rememberMe"
              sx={{
                color: "#ABABAB",
                fontSize: "16px",
                fontWeight: 700,
                marginTop: "22px",
                userSelect: "none",
                cursor: "pointer",
              }}
            >
              Keep Me Login
            </Typography>
          </Box>

          {/* سمت راست: لینک */}
          <Link
            href="#"
            onClick={handleForgotPasswordClick}
            sx={{
              marginTop: "22px",
              color: "#1D8D94",
              fontSize: "16px",
              fontWeight: 700,
              marginRight: "36px",
              cursor: "pointer",
              textDecoration: "none",
              '&:hover': {
                textDecoration: "underline",
              },
            }}
          >
            Forgot Your Password?
          </Link>
        </Box>

        {/* دکمه لاگین */}
        <Button
          type="submit"
          sx={{
            mt: "46px",
            backgroundColor: "#1D8D94",
            width: "485px",
            height: "60px",
            marginLeft: "39px",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: 700,
            color: "#FFFFFF",
            textTransform: "none",
            boxShadow: "0 4px 8px rgba(29, 141, 148, 0.5)",
            '&:hover': {
              backgroundColor: "#16666c",
            },
          }}
        >
          Login
        </Button>

        {/* لینک ثبت‌نام */}
        <Typography
          align="center"
          sx={{
            textDecoration: "none",
            fontWeight: 700,
            mt: "27px",
            color: "#ABABAB",
            cursor: "pointer",
            textTransform: "none",
          }}
        >
          Dont Have An Account?{" "}
          <Link
            component="button"
            type="button"
            onClick={handleRegisterClick}
            sx={{
              textDecoration: "none",
              fontWeight: 700,
              color: "#1D8D94",
              cursor: "pointer",
              textTransform: "none",
              padding: "0px",
              display: "inline",
              verticalAlign: "baseline",
              '&:hover': {
                textDecoration: "underline",
              },
            }}
          >
            Register
          </Link>
        </Typography>
      </Box>
    </Card>
  );
};

export default LoginCard;