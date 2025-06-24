import { AppBar, Toolbar, Typography, Button, Stack, Box } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Tema personalizado com as novas cores
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Azul moderno
      light: '#3b82f6',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#7c3aed', // Roxo vibrante
      light: '#8b5cf6',
      dark: '#6d28d9',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          borderRadius: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.3)',
          },
        },
        text: {
          color: 'rgba(255, 255, 255, 0.9)',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
          },
        },
      },
    },
  },
});

export default function NavBar() {
  const location = useLocation();
  
  return (
    <ThemeProvider theme={customTheme}>
      <AppBar 
        position="static" 
        sx={{ 
          borderRadius: 0,
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
      >
        <Toolbar sx={{ padding: '0 2rem', minHeight: '70px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            {/* Logo/Título da aplicação */}
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 700,
                fontSize: '1.5rem',
                background: 'linear-gradient(45deg, #ffffff, #e2e8f0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginRight: 4,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              Sistema de Produtos
            </Typography>
            
            {/* Navegação */}
            <Stack direction="row" spacing={1}>
              <Button
                color={location.pathname === "/" ? "secondary" : "inherit"}
                variant={location.pathname === "/" ? "contained" : "text"}
                component={RouterLink}
                to="/"
                startIcon={<ListAltIcon />}
                sx={{ 
                  fontWeight: location.pathname === "/" ? 600 : 500,
                  background: location.pathname === "/" 
                    ? 'rgba(255, 255, 255, 0.2)' 
                    : 'transparent',
                  backdropFilter: location.pathname === "/" ? 'blur(10px)' : 'none',
                  border: location.pathname === "/" 
                    ? '1px solid rgba(255, 255, 255, 0.3)' 
                    : 'none',
                  '&:hover': {
                    background: location.pathname === "/" 
                      ? 'rgba(255, 255, 255, 0.3)' 
                      : 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                Lista de Produtos
              </Button>
              <Button
                color={location.pathname === "/novo" ? "secondary" : "inherit"}
                variant={location.pathname === "/novo" ? "contained" : "text"}
                component={RouterLink}
                to="/novo"
                startIcon={<AddCircleOutlineIcon />}
                sx={{
                  fontWeight: location.pathname === "/novo" ? 600 : 500,
                  background: location.pathname === "/novo" 
                    ? 'rgba(255, 255, 255, 0.2)' 
                    : 'transparent',
                  backdropFilter: location.pathname === "/novo" ? 'blur(10px)' : 'none',
                  border: location.pathname === "/novo" 
                    ? '1px solid rgba(255, 255, 255, 0.3)' 
                    : 'none',
                  '&:hover': {
                    background: location.pathname === "/novo" 
                      ? 'rgba(255, 255, 255, 0.3)' 
                      : 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                Novo Produto
              </Button>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

