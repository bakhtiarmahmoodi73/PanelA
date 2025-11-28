// src/pages/ForgotPasswordPage/ForgotPasswordPage.tsx
import React, { useState } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import forgotPasswordImage from "../../src/assets/images/forgot/forget password.svg";

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleConfirm = (e: React.FormEvent): void => {
    e.preventDefault();
    // منطق ارسال لینک بازیابی رمز عبور اینجا پیاده‌سازی می‌شود
    console.log("Forgot password email:", email);
    
    // هدایت به صفحه تغییر رمز عبور
    navigate("/auth/change-password");
  };

  return (
    <Card
      sx={{
        display: "block",
        maxWidth: "560px",
        width: "100%",
        height: "366px",
        borderRadius: "30px",
        marginTop: "234px",
        marginBottom: "152px",
        marginX: "auto",
        backgroundColor: "#2A3342",
        paddingBottom: "32px",
      }}
    >
      <Box component="form" onSubmit={handleConfirm}>
        {/* تصویر در بالای کارت */}
        <Box
          component="img"
          src={forgotPasswordImage} 
          alt="Forgot Password Logo"
          sx={{
            width: "100%",
            maxWidth: "271px",
            marginTop: "32px",
            marginX: "auto",
            display: "block",
          }}
        />

        {/* فیلد Email */}
        <Box sx={{ mt: "55px", ml: "38px", mr: "36px" }}>
          <Typography
            sx={{
              fontWeight: 700,
              color: "#ABABAB",
              fontSize: "16px",
              mb: "15px"
            }}
          >
            Email:
          </Typography>
          <TextField
            fullWidth
            name="email"
            type="email"
            placeholder="Please Enter Your Email"
            value={email}
            onChange={handleInputChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "57px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 700,
                color: "#FFFFFF",
                backgroundColor: "#242C39",
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "#1D8D94",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1D8D94",
                },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#FFFFFF !important",
                opacity: 1,
              },
            }}
          />
        </Box>

        {/* دکمه Confirm */}
        <Button
          type="submit"
          fullWidth
          sx={{
            mt: "15px",
            backgroundColor: "#1D8D94",
            width:"485px",
            height: "60px",
            marginLeft: "39px",
            marginRight: "36px",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: 700,
            color: "#FFFFFF",
            textTransform: "none",
            boxShadow: "0 4px 8px rgba(29, 141, 148, 0.5)",
            '&:hover': {
              backgroundColor: "#16666c",
            }
          }}
        >
          Confirm
        </Button>
      </Box>
    </Card>
  );
};

export default ForgotPasswordPage;