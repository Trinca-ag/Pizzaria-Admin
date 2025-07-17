// src/styles/animations.ts
import { keyframes, css } from 'styled-components';

// Animações de entrada
export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const slideDown = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const slideLeft = keyframes`
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const slideRight = keyframes`
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Animações de zoom
export const zoomIn = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const zoomOut = keyframes`
  from {
    transform: scale(1.1);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

// Animações de rotação
export const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

// Animações de bounce
export const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
`;

// Animações de shake
export const shake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-2px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(2px);
  }
`;

// Animações de notificação
export const notificationSlideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const notificationSlideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

// Animações de modal
export const modalFadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

export const modalFadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.9) translateY(-10px);
  }
`;

// Animações de overlay
export const overlayFadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const overlayFadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

// Animações de loading
export const loadingDots = keyframes`
  0%, 80%, 100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
`;

export const loadingBars = keyframes`
  0%, 40%, 100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
  }
`;

// Animações de hover
export const hoverGlow = keyframes`
  from {
    box-shadow: 0 0 5px rgba(255, 107, 53, 0.3);
  }
  to {
    box-shadow: 0 0 20px rgba(255, 107, 53, 0.6);
  }
`;

export const hoverLift = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-2px);
  }
`;

// Animações de progresso
export const progressBar = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`;

export const progressPulse = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Animações de typing
export const typing = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

export const blink = keyframes`
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
`;

// Animações de números (contadores)
export const countUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Animações de card
export const cardFlip = keyframes`
  0% {
    transform: rotateY(0);
  }
  50% {
    transform: rotateY(-90deg);
  }
  100% {
    transform: rotateY(0);
  }
`;

// Animações de status
export const statusPulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

// Função helper para aplicar animações com css
export const applyAnimation = (
  animationName: any,
  duration: string = '0.3s',
  easing: string = 'ease-in-out',
  delay: string = '0s',
  fillMode: string = 'both'
) => css`
  animation: ${animationName} ${duration} ${easing} ${delay} ${fillMode};
`;

// Mixins de animação comuns usando css
export const animationMixins = {
  fadeIn: css`
    animation: ${fadeIn} 0.3s ease-in-out;
  `,
  slideUp: css`
    animation: ${slideUp} 0.3s ease-in-out;
  `,
  slideDown: css`
    animation: ${slideDown} 0.3s ease-in-out;
  `,
  zoomIn: css`
    animation: ${zoomIn} 0.3s ease-in-out;
  `,
  pulse: css`
    animation: ${pulse} 2s infinite;
  `,
  spin: css`
    animation: ${spin} 1s linear infinite;
  `,
  bounce: css`
    animation: ${bounce} 1s infinite;
  `,
  shake: css`
    animation: ${shake} 0.5s;
  `,
};

// Transições comuns
export const transitions = {
  fast: 'all 0.15s ease-in-out',
  normal: 'all 0.3s ease-in-out',
  slow: 'all 0.5s ease-in-out',
  color: 'color 0.2s ease-in-out',
  background: 'background-color 0.2s ease-in-out',
  transform: 'transform 0.2s ease-in-out',
  opacity: 'opacity 0.2s ease-in-out',
  shadow: 'box-shadow 0.2s ease-in-out',
};

// Easing functions
export const easing = {
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  easeInSine: 'cubic-bezier(0.47, 0, 0.745, 0.715)',
  easeOutSine: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
  easeInOutSine: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
  easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  easeInQuart: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
  easeOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  easeInOutQuart: 'cubic-bezier(0.77, 0, 0.175, 1)',
  easeInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
  easeOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
  easeInOutQuint: 'cubic-bezier(0.86, 0, 0.07, 1)',
  easeInExpo: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
  easeOutExpo: 'cubic-bezier(0.19, 1, 0.22, 1)',
  easeInOutExpo: 'cubic-bezier(1, 0, 0, 1)',
  easeInCirc: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
  easeOutCirc: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
  easeInOutCirc: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
  easeInBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  easeInOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

// Configurações de duração por tipo de animação
export const durations = {
  instant: '0.1s',
  fast: '0.2s',
  normal: '0.3s',
  slow: '0.5s',
  slower: '0.8s',
  slowest: '1s',
  micro: '0.05s',
  quick: '0.15s',
  moderate: '0.4s',
  deliberate: '0.6s',
  leisurely: '1.2s',
  glacial: '2s',
};

// Presets de animação completos usando css
export const animationPresets = {
  // Entrada suave
  gentleEntrance: css`animation: ${fadeIn} 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);`,
  
  // Entrada rápida
  quickEntrance: css`animation: ${slideUp} 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);`,
  
  // Entrada dramática
  dramaticEntrance: css`animation: ${zoomIn} 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);`,
  
  // Hover suave
  gentleHover: css`animation: ${hoverLift} 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);`,
  
  // Hover com brilho
  glowHover: css`animation: ${hoverGlow} 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);`,
  
  // Loading
  loadingSpinner: css`animation: ${spin} 1s linear infinite;`,
  loadingPulse: css`animation: ${pulse} 1.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;`,
  loadingBounce: css`animation: ${bounce} 1.4s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;`,
  
  // Notificações
  notificationIn: css`animation: ${notificationSlideIn} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);`,
  notificationOut: css`animation: ${notificationSlideOut} 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045);`,
  
  // Modal
  modalIn: css`animation: ${modalFadeIn} 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);`,
  modalOut: css`animation: ${modalFadeOut} 0.2s cubic-bezier(0.895, 0.03, 0.685, 0.22);`,
  
  // Overlay
  overlayIn: css`animation: ${overlayFadeIn} 0.2s ease-out;`,
  overlayOut: css`animation: ${overlayFadeOut} 0.2s ease-in;`,
  
  // Status changes
  statusChange: css`animation: ${statusPulse} 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) 3;`,
  
  // Error shake
  errorShake: css`animation: ${shake} 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955);`,
  
  // Success bounce
  successBounce: css`animation: ${bounce} 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);`,
};