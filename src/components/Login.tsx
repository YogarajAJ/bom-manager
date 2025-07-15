'use client';
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Paper,
  Alert,
  Collapse,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { login } from '@/services/auth.service';

interface LoginFormState {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginFormState>({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (): Promise<void> => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const data = await login(form);
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('role', data.user.role);

      // Redirect based on role or just go to landing page
      router.push('/dashboard');
    } catch (err: any) {
      setErrorMessage(err?.response?.data?.message || 'Login failed');
      setTimeout(() => setErrorMessage(null), 4000);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Paper elevation={0} sx={{ border: '1px solid #ccc', p: 4, width: 350, borderRadius: 2, bgcolor: '#fff' }}>
        <Typography variant="h5" textAlign="center" gutterBottom>Login</Typography>
        <Collapse in={!!errorMessage}>
          {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}
        </Collapse>
        <Box onKeyDown={handleKeyDown}>
          <TextField fullWidth label="Username" name="username" value={form.username} onChange={handleChange} margin="normal" size="small" />
          <TextField fullWidth label="Password" name="password" type="password" value={form.password} onChange={handleChange} margin="normal" size="small" />
          <Button fullWidth variant="contained" onClick={handleLogin} disabled={loading} sx={{ mt: 2 }}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;