// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      external: [
        "@solana/web3.js",
        "@solana/wallet-adapter-base",
        "@solana/wallet-adapter-react",
        "@solana/wallet-adapter-react-ui",
        "@solana/wallet-adapter-wallets"
      ]
    }
  },
  resolve: {
    alias: {
      "crypto": "crypto-browserify",
      "stream": "stream-browserify",
      "assert": "assert",
      "http": "stream-http",
      "https": "https-browserify",
      "os": "os-browserify",
      "url": "url"
    }
  },
  define: {
    "process.env": {},
    "global": "globalThis"
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgYnVpbGQ6IHtcbiAgICB0YXJnZXQ6ICdlc25leHQnLFxuICAgIG91dERpcjogJ2Rpc3QnLFxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1xuICAgICAgICAnQHNvbGFuYS93ZWIzLmpzJyxcbiAgICAgICAgJ0Bzb2xhbmEvd2FsbGV0LWFkYXB0ZXItYmFzZScsXG4gICAgICAgICdAc29sYW5hL3dhbGxldC1hZGFwdGVyLXJlYWN0JyxcbiAgICAgICAgJ0Bzb2xhbmEvd2FsbGV0LWFkYXB0ZXItcmVhY3QtdWknLFxuICAgICAgICAnQHNvbGFuYS93YWxsZXQtYWRhcHRlci13YWxsZXRzJ1xuICAgICAgXVxuICAgIH1cbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnY3J5cHRvJzogJ2NyeXB0by1icm93c2VyaWZ5JyxcbiAgICAgICdzdHJlYW0nOiAnc3RyZWFtLWJyb3dzZXJpZnknLFxuICAgICAgJ2Fzc2VydCc6ICdhc3NlcnQnLFxuICAgICAgJ2h0dHAnOiAnc3RyZWFtLWh0dHAnLFxuICAgICAgJ2h0dHBzJzogJ2h0dHBzLWJyb3dzZXJpZnknLFxuICAgICAgJ29zJzogJ29zLWJyb3dzZXJpZnknLFxuICAgICAgJ3VybCc6ICd1cmwnXG4gICAgfVxuICB9LFxuICBkZWZpbmU6IHtcbiAgICAncHJvY2Vzcy5lbnYnOiB7fSxcbiAgICAnZ2xvYmFsJzogJ2dsb2JhbFRoaXMnXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IHRydWUsXG4gICAgcG9ydDogNTE3MyxcbiAgICBzdHJpY3RQb3J0OiB0cnVlXG4gIH1cbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBeU4sU0FBUyxvQkFBb0I7QUFDdFAsT0FBTyxXQUFXO0FBRWxCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sZUFBZSxDQUFDO0FBQUEsSUFDaEIsVUFBVTtBQUFBLEVBQ1o7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxFQUNkO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
