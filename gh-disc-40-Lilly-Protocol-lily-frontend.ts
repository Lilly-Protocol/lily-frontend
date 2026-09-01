// src/lib/designTokens.ts
export const designTokens = {
  colors: {
    // Primary brand colors
    primary: '#6366f1',
    primaryDark: '#4f46e5',
    primaryLight: '#818cf8',
    
    // Semantic colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    
    // Backgrounds
    background: '#ffffff',
    surface: '#f9fafb',
    surfaceAlt: '#f3f4f6',
    
    // Text
    textPrimary: '#111827',
    textSecondary: '#4b5563',
    textMuted: '#9ca3af',
    
    // Borders
    border: '#e5e7eb',
    borderFocus: '#6366f1',
    
    // Overlay
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
};

// Example usage in a scaffold component (e.g., src/components/scaffold/Button.tsx)
import { designTokens } from '@/lib/designTokens';

const Button = ({ variant = 'primary', children, ...props }) => {
  const baseStyles = {
    padding: designTokens.spacing.sm,
    borderRadius: designTokens.borderRadius.md,
    fontWeight: designTokens.typography.fontWeight.medium,
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s, opacity 0.2s',
  };

  const variants = {
    primary: {
      backgroundColor: designTokens.colors.primary,
      color: designTokens.colors.textPrimary,
      '&:hover': {
        backgroundColor: designTokens.colors.primaryDark,
      },
    },
    secondary: {
      backgroundColor: designTokens.colors.surface,
      color: designTokens.colors.textPrimary,
      border: `1px solid ${designTokens.colors.border}`,
      '&:hover': {
        backgroundColor: designTokens.colors.surfaceAlt,
      },
    },
    danger: {
      backgroundColor: designTokens.colors.error,
      color: '#ffffff',
      '&:hover': {
        backgroundColor: '#dc2626',
      },
    },
  };

  return (
    <button
      style={{ ...baseStyles, ...variants[variant] }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;