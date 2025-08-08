import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  // @font-face {
  //   font-family: '29LT Bukra';
  //   src: url('/fonts/29LT-Bukra.ttf') format('truetype');
  //   font-weight: normal;
  //   font-style: normal;
  // }

  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'IBM Plex Sans Arabic', sans-serif; 
    background-color: #0f1e23;
    color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1,h2,h3,h4,h5,h6,p  {
    margin: 0;
    font-family: 'IBM Plex Sans Arabic', sans-serif;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    font-family: 'IBM Plex Sans Arabic', sans-serif;
  }

.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
  backdrop-filter: blur(5px); /* Blurring effect */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  
  /* Disable all interactions */
  pointer-events: auto;
}

.loader-content {
  pointer-events: auto; /* Allow interaction with the loader itself */
}

/* Prevent scrolling when loading */
body.loading {
  overflow: hidden;
}


 .Toastify__toast {
    background-color: #ffffff;
    color: #000000;
    font-weight: 500;
    font-family: 'IBM Plex Sans Arabic', sans-serif;
  }

  .Toastify__progress-bar {
    background: #00778e;
  }

  .Toastify__close-button {
    color: #000000;
  }

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0px 1000px #f9f9f9 inset !important;
  box-shadow: 0 0 0px 1000px #f9f9f9 inset !important;
  -webkit-text-fill-color: #000 !important;
  transition: background-color 5000s ease-in-out 0s;
}
  
`;
