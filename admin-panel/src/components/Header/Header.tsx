"use client";
import { FC } from "react";
import { useNavigate } from "react-router-dom"; // اضافه کردن useNavigate
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Button, Container } from "@mui/material";
import logo from "../../../src/assets/images/logs/logoImage.svg"
import user from "../../assets/images/users/Frame (1).svg";

const menuItems = [
  { label: "Home", weight: 700, size: "16px", path: "/" },
  { label: "About Us", weight: 400, size: "16px", path: "/about" },
  { label: "Contact Us", weight: 400, size: "16px", path: "/contact" },
  { label: "Blog", weight: 400, size: "16px", path: "/blog" },
  { label: "FAQ", weight: 400, size: "16px", path: "/faq" },
];

const Header: FC = () => {
  const navigate = useNavigate(); // استفاده از هوک navigate

  const handleLoginClick = () => {
    navigate("/auth/login"); // هدایت به صفحه login
  };

  const handleLogoClick = () => {
    navigate("/"); // هدایت به صفحه اصلی
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        maxWidth: "1140px",
        margin: "0 auto",
        backgroundColor: "transparent",
        boxShadow: "none",
        background: "inherit",
        border: "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo"
          onClick={handleLogoClick} // اضافه کردن onClick برای لوگو
          sx={{
            width: 232,
            height: 65,
            marginTop: "52px",
            cursor: "pointer",
          }}
        />

        {/* ---- Navigation Menu ---- */}
        <Stack
          direction="row"
          spacing="35px"
          sx={{
            marginTop: "74px",
            marginLeft: "148px",
            marginRight: "229px",
            display: { xs: "none", md: "flex" },
          }}
        >
          {menuItems.map((item) => (
            <Typography
              key={item.label}
              fontSize={item.size}
              onClick={() => handleMenuItemClick(item.path)} // اضافه کردن onClick برای منوها
              sx={{
                color: "#E4E4E4",
                fontWeight: item.weight,
                cursor: "pointer",
                "&:hover": { color: "#1976d2" },
              }}
            >
              {item.label}
            </Typography>
          ))}
        </Stack>

        {/* ---- Right Section (User + Login/Register) ---- */}
        <Stack direction="row">
          <Stack direction="row">
            <Box
              component="img"
              src={user}
              alt="user"
              sx={{
                width: 24,
                height: 24,
                marginTop: "73px",
                cursor: "pointer",
              }}
            />

            <Box>
              <Button
                onClick={handleLoginClick} // تغییر به onClick با استفاده از navigate
                sx={{
                  color: "#E4E4E4",
                  fontSize: "16px",
                  fontWeight: 400,
                  marginTop: "72px",
                  marginLeft: "5px",
                  textTransform: "none",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
              >
                Login&nbsp;&nbsp;/&nbsp;Register
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default Header;