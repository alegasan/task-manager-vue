
export const darkTheme = {

  bg: {
    primary: 'bg-dark-bg',
    secondary: 'bg-dark-surface',
    muted: 'bg-gray-800',
  },
  

  text: {
    primary: 'text-dark-text',
    secondary: 'text-dark-textSecondary',
    error: 'text-red-400',
  },
  

  border: {
    default: 'border-dark-border',
    input: 'border-dark-border',
  },
  

  accent: {
    primary: 'bg-blue-accent',
    primaryHover: 'hover:bg-blue-accentDark',
    light: 'bg-blue-light',
    lightHover: 'hover:bg-cyan-500',
    textPrimary: 'text-blue-accent',
    textLight: 'text-blue-light',
    focusBorder: 'focus:border-blue-accent',
    focusRing: 'focus:ring-blue-accent focus:ring-opacity-50',
  },
  

  card: 'bg-dark-surface border border-dark-border rounded-lg',
  input: 'bg-gray-700 border border-dark-border text-dark-text placeholder-gray-500 focus:outline-none focus:border-blue-accent focus:ring-2 focus:ring-blue-accent focus:ring-opacity-30',
  button: {
    primary: 'bg-blue-accent border-2 border-blue-light hover:bg-blue-accentDark hover:border-blue-accent text-white font-semibold py-2 px-4 rounded transition-all duration-300 disabled:bg-gray-600 disabled:border-gray-500 disabled:cursor-not-allowed shadow-lg',
    secondary: 'bg-gray-700 border-2 border-gray-600 hover:bg-gray-600 hover:border-gray-500 text-dark-text font-semibold py-2 px-4 rounded transition-all duration-300',
  },
  label: 'block font-semibold text-dark-text mb-2',
  errorText: 'block text-red-400 text-sm mt-1',
  link: 'text-blue-accent hover:text-blue-light font-semibold transition-colors duration-300',
};


export const themeClasses = {
  darkContainer: 'min-h-screen bg-dark-bg flex items-center justify-center',
  authCard: 'bg-dark-surface border border-dark-border rounded-lg p-8 w-full max-w-md shadow-2xl',
  authTitle: 'text-center mb-6 text-3xl font-bold text-dark-text',
  formGroup: 'mb-4 flex flex-col gap-2',
  inputField: 'w-full px-4 py-3 bg-gray-700 border border-dark-border text-dark-text placeholder-gray-500 rounded-md text-base transition-all duration-300 focus:outline-none focus:border-blue-accent focus:ring-2 focus:ring-blue-accent focus:ring-opacity-30',
  label: 'font-semibold text-sm text-dark-text',
  errorMessage: 'text-red-400 text-xs',
  submitButton: 'w-full py-3 bg-blue-accent border-2 border-blue-light hover:bg-blue-accentDark hover:border-blue-accent text-white rounded-md text-base font-semibold cursor-pointer mt-2 transition-all duration-300 disabled:bg-gray-600 disabled:border-gray-500 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-accent/30 hover:shadow-xl',
  linkText: 'text-blue-accent hover:text-blue-light font-semibold transition-colors duration-300',
  dividerText: 'text-dark-textSecondary',
};
