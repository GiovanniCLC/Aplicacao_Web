import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Paper, 
  Typography, 
  Box, 
  CircularProgress,
  Card,
  CardContent,
  Fade,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import produtoService from "../services/produtoService";
import FormProduto from "../components/FormProduto";
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
});

export default function FormProdutoPage() {
  const { id } = useParams();
  const [produto, setProduto] = useState({ nome: "", preco: "" });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setInitialLoading(true);
      produtoService.obter(id).then((data) => {
        setProduto({ nome: data.nome, preco: data.preco });
        setInitialLoading(false);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto((prev) => ({
      ...prev,
      [name]: name === "preco" ? value.replace(",", ".") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await produtoService.atualizar(id, {
          nome: produto.nome,
          preco: parseFloat(produto.preco),
        });
      } else {
        await produtoService.criar({
          nome: produto.nome,
          preco: parseFloat(produto.preco),
        });
      }
      navigate("/");
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
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
            Carregando produto...
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={customTheme}>
      <Box className="main-container">
        <Fade in={true} timeout={600}>
          <Box sx={{ maxWidth: 500, mx: 'auto' }}>
            {/* Header com ícone e título */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                  mb: 2,
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                }}
              >
                {id ? (
                  <EditIcon sx={{ fontSize: 40, color: 'white' }} />
                ) : (
                  <AddCircleOutlineIcon sx={{ fontSize: 40, color: 'white' }} />
                )}
              </Box>
              
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mb: 1,
                }}
              >
                {id ? "Editar Produto" : "Novo Produto"}
              </Typography>
              
              <Typography variant="body1" color="text.secondary">
                {id 
                  ? "Atualize as informações do produto abaixo" 
                  : "Preencha os dados para cadastrar um novo produto"
                }
              </Typography>
            </Box>

            {/* Card do formulário */}
            <Card
              className="card"
              sx={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                overflow: 'hidden',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <FormProduto
                  produto={produto}
                  loading={loading}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  onCancel={() => navigate("/")}
                />
              </CardContent>
            </Card>

            {/* Informações adicionais */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                * Todos os campos são obrigatórios
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Box>
    </ThemeProvider>
  );
}

