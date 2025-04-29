/// <reference types="vite/client" />

declare module "@vitejs/plugin-react" {
  const react: () => import("vite").Plugin;
  export default react;
} 