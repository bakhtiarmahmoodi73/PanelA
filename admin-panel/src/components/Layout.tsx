// src/components/Layout.tsx
import { ReactNode } from 'react';
import { Container, Box } from '@mui/material';
import Header from './Header/Header';
import Footer from './Footer/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // ارتفاع حداقل برابر صفحه
      }}
    >
      <Header />
      
      <Container 
        component="main" 
        sx={{ 
          flex: 1, // این باعث می‌شود main فضای باقیمانده را پر کند
          py: 2,
          width: '100%',
        }}
      >
        {children}
      </Container>

      <Box sx={{ mt: 'auto' }}> {/* این باعث می‌شود فوتر به پایین منتقل شود */}
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;