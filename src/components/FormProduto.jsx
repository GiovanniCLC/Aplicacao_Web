import { 
  TextField, 
  Button, 
  Stack, 
  CircularProgress, 
  Box,
  InputAdornment,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Tema personalizado para o formulário
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
      light: '#3b82f6',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#7c3aed',
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
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            },
            '&.Mui-focused': {
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
            },
          },
          '& .MuiInputLabel-root': {
            fontWeight: 500,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          padding: '12px 24px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
            background: 'rgba(124, 58, 237, 0.05)',
          },
        },
      },
    },
  },
});

export default function FormProduto({
  produto,
  loading,
  onChange,
  onSubmit,
  onCancel,
}) {
  if (loading) {
    return (
      <ThemeProvider theme={customTheme}>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 6,
            gap: 2
          }}
        >
          <CircularProgress size={50} thickness={4} />
          <Typography variant="body1" color="text.secondary">
            Salvando produto...
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={customTheme}>
      <form onSubmit={onSubmit}>
        <Stack spacing={3}>
          {/* Campo Nome */}
          <Box>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                mb: 1, 
                fontWeight: 600, 
                color: 'text.primary',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <PersonIcon sx={{ fontSize: '1.2rem', color: 'primary.main' }} />
              Nome do Produto
            </Typography>
            <TextField
              name="nome"
              value={produto.nome}
              onChange={onChange}
              required
              fullWidth
              placeholder="Digite o nome do produto"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#f8fafc',
                  },
                },
              }}
            />
          </Box>

          {/* Campo Preço */}
          <Box>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                mb: 1, 
                fontWeight: 600, 
                color: 'text.primary',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <AttachMoneyIcon sx={{ fontSize: '1.2rem', color: 'primary.main' }} />
              Preço
            </Typography>
            <TextField
              name="preco"
              type="number"
              value={produto.preco}
              onChange={onChange}
              required
              fullWidth
              placeholder="0,00"
              inputProps={{ step: "0.01", min: "0" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
                      R$
                    </Typography>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#f8fafc',
                  },
                },
              }}
            />
          </Box>

          {/* Botões de ação */}
          <Stack spacing={2} sx={{ mt: 4 }}>
            <Button 
              type="submit" 
              variant="contained" 
              size="large"
              startIcon={<SaveIcon />}
              sx={{
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
              }}
            >
              Salvar Produto
            </Button>
            
            <Button 
              variant="outlined" 
              color="secondary" 
              size="large"
              onClick={onCancel}
              startIcon={<CancelIcon />}
              sx={{
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 500,
              }}
            >
              Cancelar
            </Button>
          </Stack>

          {/* Dica de preenchimento */}
          <Box 
            sx={{ 
              mt: 2, 
              p: 2, 
              backgroundColor: 'rgba(37, 99, 235, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(37, 99, 235, 0.1)',
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              💡 <strong>Dica:</strong> Use vírgula ou ponto para separar os centavos no preço
            </Typography>
          </Box>
        </Stack>
      </form>
    </ThemeProvider>
  );
}

