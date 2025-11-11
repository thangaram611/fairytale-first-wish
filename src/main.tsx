import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerSW } from 'virtual:pwa-register';

// PWA Service Worker Registration - uses vite-plugin-pwa automatic registration
const updateSW = registerSW({
  onNeedRefresh() {
    // Optional: Show a prompt to user that new content is available
    if (confirm('New content available. Reload?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
});

createRoot(document.getElementById("root")!).render(<App />);
