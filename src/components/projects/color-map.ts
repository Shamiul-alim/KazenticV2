export const colorMapClasses = {
  // Primary colors
  primary: 'bg-blue-600',
  primaryLight: 'bg-blue-400',
  primaryDark: 'bg-blue-800',

  // Secondary colors
  secondary: 'bg-purple-600',
  secondaryLight: 'bg-purple-400',
  secondaryDark: 'bg-purple-800',

  // Success colors
  success: 'bg-green-600',
  successLight: 'bg-green-400',
  successDark: 'bg-green-800',

  // Warning colors
  warning: 'bg-yellow-600',
  warningLight: 'bg-yellow-400',
  warningDark: 'bg-yellow-800',

  // Error colors
  error: 'bg-red-600',
  errorLight: 'bg-red-400',
  errorDark: 'bg-red-800',

  // Neutral colors
  neutral: 'bg-gray-600',
  neutralLight: 'bg-gray-400',
  neutralDark: 'bg-gray-800',

  // Text colors
  textPrimary: 'text-gray-900',
  textSecondary: 'text-gray-600',
  textTertiary: 'text-gray-500',

  // Border colors
  borderPrimary: 'border-gray-300',
  borderSecondary: 'border-gray-200',
  borderLight: 'border-gray-100',
};

export type ColorMapKey = keyof typeof colorMapClasses;

export const getColorClass = (colorKey: ColorMapKey): string => {
  return colorMapClasses[colorKey] || colorMapClasses.neutral;
};
