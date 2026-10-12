/**
 * Design Tokens - Sentinela Hospital
 *
 * Tokens de design para consistência visual em toda a aplicação.
 * Cores baseadas em identidade institucional profissional.
 */

export const colors = {
  // Cores Institucionais
  primary: {
    DEFAULT: "hsl(221.2 83.2% 53.3%)", // Azul
    foreground: "hsl(210 40% 98%)",
  },
  secondary: {
    DEFAULT: "hsl(217.2 91.2% 59.8%)", // Azul-Marinho
    foreground: "hsl(222.2 47.4% 11.2%)",
  },

  // Estados
  success: {
    DEFAULT: "hsl(142.1 76.2% 36.3%)", // Verde
    foreground: "hsl(355.7 100% 97.3%)",
  },
  warning: {
    DEFAULT: "hsl(32.6 94.6% 44.7%)", // Âmbar
    foreground: "hsl(355.7 100% 97.3%)",
  },
  destructive: {
    DEFAULT: "hsl(0 84.2% 60.2%)", // Vermelho
    foreground: "hsl(355.7 100% 97.3%)",
  },

  // Prioridades de Triagem
  priority: {
    red: "hsl(0 84.2% 60.2%)", // Emergência
    orange: "hsl(32.6 94.6% 44.7%)", // Muito urgente
    yellow: "hsl(45 93% 47%)", // Urgente
    green: "hsl(142.1 76.2% 36.3%)", // Pouco urgente
    blue: "hsl(221.2 83.2% 53.3%)", // Não urgente
  },
} as const;

export const spacing = {
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "3rem", // 48px
  "3xl": "4rem", // 64px
} as const;

export const borderRadius = {
  sm: "calc(var(--radius) - 4px)",
  md: "calc(var(--radius) - 2px)",
  lg: "var(--radius)",
  xl: "calc(var(--radius) + 4px)",
  full: "9999px",
} as const;

export const typography = {
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
} as const;

export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
} as const;

export const animation = {
  duration: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
  },
  easing: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
  },
} as const;
