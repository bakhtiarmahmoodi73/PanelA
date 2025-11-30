import React from "react";
import { useFormik } from "formik";
import { z } from "zod";
import log from "../assets/images/logo/login.svg";
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
  Alert,
  Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff, Cancel } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { loginUser, clearError } from "../store/slices/authSlice";

// تعریف Schema با Zod
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "The email is incorrect")
    .email("The email is incorrect"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "The password is incorrect"),
  rememberMe: z.boolean().default(false),
});

// تعریف تایپ از روی Schema
type LoginFormData = z.infer<typeof loginSchema>;

const LoginCard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showError, setShowError] = React.useState<boolean>(false);

  const { isLoading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Redirect if authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Show error snackbar when error changes
  React.useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  // Formik configuration با Zod
  const formik = useFormik<LoginFormData>({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const result = loginSchema.safeParse(values);
      
      if (!result.success) {
        const errors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          const path = issue.path[0] as string;
          errors[path] = issue.message;
        });
        return errors;
      }
      
      return {};
    },
    onSubmit: async (values) => {
      try {
        await dispatch(loginUser({
          email: values.email,
          password: values.password
        })).unwrap();
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  });

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleRegisterClick = (): void => {
    navigate("/auth/register");
  };

  const handleForgotPasswordClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    navigate("/auth/forgot-password");
  };

  const handleCloseError = (): void => {
    setShowError(false);
    dispatch(clearError());
  };

  const handleClearEmail = (): void => {
    formik.setFieldValue("email", "");
    formik.setFieldTouched("email", false);
  };

  // بررسی آیا ایمیل خطا دارد و کاربر فیلد را لمس کرده
  const hasEmailError = formik.touched.email && Boolean(formik.errors.email);

  return (
    <>
      <Snackbar 
        open={showError} 
        autoHideDuration={6000} 
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Card
        sx={{
          display: "block",
          maxWidth: "560px",
          width: "100%",
          height: "auto",
          borderRadius: "30px",
          marginTop: "157px",
          marginBottom: "152px",
          marginX: "auto",
          backgroundColor: "#2A3342",
          paddingBottom: "32px",
        }}
      >
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <Box
            component="img"
            src={log}
            alt="Login Logo"
            sx={{
              width: "100%",
              maxWidth: "91px",
              marginTop: "32px",
              marginX: "auto",
              display: "block",
            }}
          />

          {/* Email */}
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
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={hasEmailError}
            helperText={hasEmailError && "The email is incorrect"}
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
                // حالت خطا - border قرمز
                "&.Mui-error": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#f44336 !important",
                    borderWidth: "2px !important",
                  },
                },
                // حالت نرمال
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#444",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1D8D94",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1D8D94",
                },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#FFFFFF !important",
                opacity: 1,
              },
              "& .MuiFormHelperText-root": {
                color: "#f44336",
                marginLeft: "8px",
                fontSize: "12px",
                fontWeight: 700,
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {/* نمایش آیکون ضربدر وقتی ایمیل نامعتبر است */}
                  {hasEmailError && (
                    <IconButton
                      onClick={handleClearEmail}
                      edge="end"
                      sx={{ 
                        width: "24px", 
                        height: "24px", 
                        color: "#f44336",
                        mr: "10px",
                        backgroundColor: "rgba(244, 67, 54, 0.1)",
                        borderRadius: "50%",
                        "&:hover": {
                          backgroundColor: "rgba(244, 67, 54, 0.2)",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: "16px",
                        }
                      }}
                      aria-label="Clear email"
                    >
                      <Cancel />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />

          {/* Password */}
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
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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
                "&.Mui-error": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#f44336 !important",
                    borderWidth: "2px !important",
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#444",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1D8D94",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1D8D94",
                },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#FFFFFF !important",
                opacity: 1,
              },
              "& .MuiFormHelperText-root": {
                color: "#f44336",
                marginLeft: "8px",
                fontSize: "12px",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    sx={{ 
                      width: "16px", 
                      height: "16px", 
                      color: "#ABABAB",
                      mr: "21px" 
                    }}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Checkbox and Forgot Password Row */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            {/* Left: Checkbox and text */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginLeft: "39px",
              }}
            >
              <Checkbox
                name="rememberMe"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
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
                    mr: "6px",
                  },
                }}
              />

              <Typography
                component="label"
                htmlFor="rememberMe"
                sx={{
                  color: "#ABABAB",
                  fontSize: "16px",
                  fontWeight: 700,
                  userSelect: "none",
                  cursor: "pointer",
                }}
              >
                Keep Me Login
              </Typography>
            </Box>

            {/* Right: Link */}
            <Link
              href="#"
              onClick={handleForgotPasswordClick}
              sx={{
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

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isLoading}
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
              '&:disabled': {
                backgroundColor: '#cccccc',
                color: '#666666'
              },
            }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          {/* Register Link */}
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
    </>
  );
};

export default LoginCard;