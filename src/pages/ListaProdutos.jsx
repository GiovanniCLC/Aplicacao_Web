import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Typography,
  Box,
  Chip,
  Card,
  CardContent,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router-dom";
import produtoService from "../services/produtoService";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Tema personalizado
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
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
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
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            color: 'white',
            fontWeight: 600,
            fontSize: '1rem',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#f8fafc',
            transform: 'scale(1.01)',
            transition: 'all 0.2s ease',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
  },
});

export default function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const carregarProdutos = async () => {
    setLoading(true);
    try {
      const lista = await produtoService.listar();
      setProdutos(lista);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir este produto?")) {
      await produtoService.excluir(id);
      carregarProdutos();
    }
  };

  if (loading) {
    return (
      <ThemeProvider theme={customTheme}>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            gap: 2
          }}
        >
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h6" color="text.secondary">
            Carregando produtos...
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  // Renderização para mobile (cards)
  if (isMobile) {
    return (
      <ThemeProvider theme={customTheme}>
        <Box className="main-container">
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              textAlign: "center",
              fontWeight: 700,
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            <ShoppingCartIcon sx={{ mr: 1, verticalAlign: 'middle', color: '#2563eb' }} />
            Lista de Produtos
          </Typography>

          {produtos.length === 0 ? (
            <Card sx={{ textAlign: 'center', p: 4 }}>
              <CardContent>
                <ShoppingCartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Nenhum produto cadastrado
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Clique em "Novo Produto" para começar
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Grid container spacing={2}>
              {produtos.map((produto) => (
                <Grid item xs={12} key={produto.id}>
                  <Card 
                    className="product-card"
                    sx={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                            {produto.nome}
                          </Typography>
                          <Chip 
                            label={`ID: ${produto.id}`} 
                            size="small" 
                            sx={{ 
                              mt: 1,
                              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                              color: 'white',
                              fontWeight: 500,
                            }} 
                          />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            color="primary"
                            onClick={() => navigate(`/editar/${produto.id}`)}
                            sx={{
                              background: 'rgba(37, 99, 235, 0.1)',
                              '&:hover': {
                                background: 'rgba(37, 99, 235, 0.2)',
                              },
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(produto.id)}
                            sx={{
                              background: 'rgba(239, 68, 68, 0.1)',
                              '&:hover': {
                                background: 'rgba(239, 68, 68, 0.2)',
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AttachMoneyIcon sx={{ color: '#22c55e' }} />
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            fontWeight: 700,
                            color: '#22c55e',
                          }}
                        >
                          R$ {produto.preco.toFixed(2)}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </ThemeProvider>
    );
  }

  // Renderização para desktop (tabela)
  return (
    <ThemeProvider theme={customTheme}>
      <Box className="main-container">
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            textAlign: "center",
            fontWeight: 700,
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          <ShoppingCartIcon sx={{ mr: 1, verticalAlign: 'middle', color: '#2563eb' }} />
          Lista de Produtos
        </Typography>

        <TableContainer
          component={Paper}
          className="table-container"
          sx={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
        >
          <Table className="table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, fontSize: '1rem' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '1rem' }}>Nome do Produto</TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: '1rem' }}>Preço</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, fontSize: '1rem' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {produtos.map((produto) => (
                <TableRow key={produto.id} className="fade-in">
                  <TableCell>
                    <Chip 
                      label={produto.id} 
                      size="small" 
                      sx={{ 
                        background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                        color: 'white',
                        fontWeight: 500,
                      }} 
                    />
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: 500, color: '#1e293b' }}>
                      {produto.nome}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AttachMoneyIcon sx={{ color: '#22c55e', fontSize: '1.2rem' }} />
                      <Typography 
                        sx={{ 
                          fontWeight: 600,
                          color: '#22c55e',
                          fontSize: '1.1rem',
                        }}
                      >
                        R$ {produto.preco.toFixed(2)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <IconButton
                        color="primary"
                        onClick={() => navigate(`/editar/${produto.id}`)}
                        sx={{
                          background: 'rgba(37, 99, 235, 0.1)',
                          '&:hover': {
                            background: 'rgba(37, 99, 235, 0.2)',
                          },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(produto.id)}
                        sx={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          '&:hover': {
                            background: 'rgba(239, 68, 68, 0.2)',
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {produtos.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <ShoppingCartIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
                      <Typography variant="h6" color="text.secondary">
                        Nenhum produto cadastrado
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Clique em "Novo Produto" para começar
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
}

