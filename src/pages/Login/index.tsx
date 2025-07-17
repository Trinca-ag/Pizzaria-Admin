// src/pages/Login/index.tsx
import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import {
  LoginContainer,
  LoginCard,
  LoginHeader,
  LoginTitle,
  LoginSubtitle,
  LoginForm,
  LoginFooter,
  ErrorMessage,
  DemoCredentials,
} from './styles';

interface LocationState {
  from: {
    pathname: string;
  };
}

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { signIn, error, clearError, isAuthenticated } = useAuthContext();
  const location = useLocation();
  
  const from = (location.state as LocationState)?.from?.pathname || '/dashboard';

  // Redirecionar se já estiver autenticado
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }

    try {
      setIsSubmitting(true);
      clearError();
      await signIn({ email, password });
    } catch (error) {
      // Erro já tratado no contexto
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('admin@pizzaria.com');
    setPassword('admin123456');
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeader>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🍕</div>
          <LoginTitle>Sistema Administrativo</LoginTitle>
          <LoginSubtitle>Pizzaria</LoginSubtitle>
        </LoginHeader>

        <LoginForm onSubmit={handleSubmit}>
          <Input
            type="email"
            label="Email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error && error.includes('email') ? error : undefined}
            required
            autoComplete="email"
          />

          <Input
            type="password"
            label="Senha"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error && error.includes('senha') ? error : undefined}
            required
            autoComplete="current-password"
          />

          {error && (
            <ErrorMessage>
              {error}
            </ErrorMessage>
          )}

          <Button
            type="submit"
            variant="primary"
            isFullWidth
            isLoading={isSubmitting}
            loadingText="Entrando..."
          >
            Entrar
          </Button>
        </LoginForm>

        <LoginFooter>
          <DemoCredentials>
            <p><strong>Credenciais de demonstração:</strong></p>
            <p>Email: admin@pizzaria.com</p>
            <p>Senha: admin123456</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDemoLogin}
              style={{ marginTop: '8px' }}
            >
              Usar credenciais demo
            </Button>
          </DemoCredentials>
        </LoginFooter>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;