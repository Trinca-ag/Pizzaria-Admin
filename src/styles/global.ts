// src/styles/global.ts
import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  /* Reset CSS */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Importar fontes do Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap');

  /* Configurações do HTML e Body */
  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.fonts.primary};
    background-color: ${theme.colors.background.secondary};
    color: ${theme.colors.text.primary};
    line-height: ${theme.lineHeights.normal};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  /* Configurações gerais */
  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Headings */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.secondary};
    font-weight: ${theme.fontWeights.semibold};
    line-height: ${theme.lineHeights.tight};
    margin-bottom: ${theme.spacing[3]};
  }

  h1 {
    font-size: ${theme.fontSizes['4xl']};
    color: ${theme.colors.text.primary};
  }

  h2 {
    font-size: ${theme.fontSizes['3xl']};
    color: ${theme.colors.text.primary};
  }

  h3 {
    font-size: ${theme.fontSizes['2xl']};
    color: ${theme.colors.text.primary};
  }

  h4 {
    font-size: ${theme.fontSizes.xl};
    color: ${theme.colors.text.secondary};
  }

  h5 {
    font-size: ${theme.fontSizes.lg};
    color: ${theme.colors.text.secondary};
  }

  h6 {
    font-size: ${theme.fontSizes.md};
    color: ${theme.colors.text.secondary};
  }

  /* Parágrafos */
  p {
    margin-bottom: ${theme.spacing[4]};
    color: ${theme.colors.text.secondary};
  }

  /* Links */
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: ${theme.transitions.fast};
    
    &:hover {
      color: ${theme.colors.secondary};
      text-decoration: underline;
    }
  }

  /* Buttons reset */
  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    outline: none;
    
    &:focus {
      outline: 2px solid ${theme.colors.primary};
      outline-offset: 2px;
    }
  }

  /* Inputs reset */
  input, textarea, select {
    border: none;
    background: none;
    font-family: inherit;
    font-size: inherit;
    outline: none;
    
    &:focus {
      outline: 2px solid ${theme.colors.primary};
      outline-offset: 2px;
    }
  }

  /* Lists */
  ul, ol {
    margin-left: ${theme.spacing[6]};
    margin-bottom: ${theme.spacing[4]};
  }

  li {
    margin-bottom: ${theme.spacing[2]};
  }

  /* Scrollbar personalizada */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.gray[100]};
    border-radius: ${theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray[400]};
    border-radius: ${theme.borderRadius.full};
    
    &:hover {
      background: ${theme.colors.gray[500]};
    }
  }

  /* Seleção de texto */
  ::selection {
    background: ${theme.colors.primary};
    color: ${theme.colors.text.white};
  }

  /* Placeholder */
  ::placeholder {
    color: ${theme.colors.text.muted};
    opacity: 1;
  }

  /* Imagens responsivas */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Tabelas */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: ${theme.spacing[6]};
  }

  th, td {
    padding: ${theme.spacing[3]} ${theme.spacing[4]};
    text-align: left;
    border-bottom: 1px solid ${theme.colors.border.light};
  }

  th {
    background-color: ${theme.colors.background.secondary};
    font-weight: ${theme.fontWeights.semibold};
    color: ${theme.colors.text.primary};
  }

  /* Utilities Classes */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${theme.spacing[4]};
  }

  .flex {
    display: flex;
  }

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .grid {
    display: grid;
  }

  .hidden {
    display: none;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Texto */
  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;
  }

  .text-left {
    text-align: left;
  }

  .font-bold {
    font-weight: ${theme.fontWeights.bold};
  }

  .font-semibold {
    font-weight: ${theme.fontWeights.semibold};
  }

  .text-primary {
    color: ${theme.colors.primary};
  }

  .text-secondary {
    color: ${theme.colors.secondary};
  }

  .text-success {
    color: ${theme.colors.success};
  }

  .text-error {
    color: ${theme.colors.error};
  }

  .text-warning {
    color: ${theme.colors.warning};
  }

  /* Spacing */
  .mt-1 { margin-top: ${theme.spacing[1]}; }
  .mt-2 { margin-top: ${theme.spacing[2]}; }
  .mt-3 { margin-top: ${theme.spacing[3]}; }
  .mt-4 { margin-top: ${theme.spacing[4]}; }
  .mt-5 { margin-top: ${theme.spacing[5]}; }
  .mt-6 { margin-top: ${theme.spacing[6]}; }

  .mb-1 { margin-bottom: ${theme.spacing[1]}; }
  .mb-2 { margin-bottom: ${theme.spacing[2]}; }
  .mb-3 { margin-bottom: ${theme.spacing[3]}; }
  .mb-4 { margin-bottom: ${theme.spacing[4]}; }
  .mb-5 { margin-bottom: ${theme.spacing[5]}; }
  .mb-6 { margin-bottom: ${theme.spacing[6]}; }

  .p-1 { padding: ${theme.spacing[1]}; }
  .p-2 { padding: ${theme.spacing[2]}; }
  .p-3 { padding: ${theme.spacing[3]}; }
  .p-4 { padding: ${theme.spacing[4]}; }
  .p-5 { padding: ${theme.spacing[5]}; }
  .p-6 { padding: ${theme.spacing[6]}; }

  /* Animações suaves */
  .animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }

  .animate-slide-up {
    animation: slideUp 0.3s ease-in-out;
  }

  .animate-slide-down {
    animation: slideDown 0.3s ease-in-out;
  }

  /* Keyframes */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideDown {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* Responsive Design */
  @media (max-width: ${theme.breakpoints.md}) {
    .container {
      padding: 0 ${theme.spacing[3]};
    }
    
    h1 {
      font-size: ${theme.fontSizes['3xl']};
    }
    
    h2 {
      font-size: ${theme.fontSizes['2xl']};
    }
    
    h3 {
      font-size: ${theme.fontSizes.xl};
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    .container {
      padding: 0 ${theme.spacing[2]};
    }
    
    h1 {
      font-size: ${theme.fontSizes['2xl']};
    }
    
    h2 {
      font-size: ${theme.fontSizes.xl};
    }
    
    h3 {
      font-size: ${theme.fontSizes.lg};
    }
  }

  /* Loading spinner */
  .loading-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid ${theme.colors.gray[300]};
    border-top: 2px solid ${theme.colors.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Focus styles para acessibilidade */
  .focus-ring {
    &:focus {
      outline: 2px solid ${theme.colors.primary};
      outline-offset: 2px;
    }
  }
`;