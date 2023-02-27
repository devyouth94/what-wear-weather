const tailwindThemeToggle = () => {
  if (
    localStorage.getItem('chakra-ui-color-mode') === 'dark' ||
    (!('chakra-ui-color-mode' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

export default tailwindThemeToggle;
