import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("circtr", {
  platform: process.platform,
  window: {
    minimize: () => ipcRenderer.invoke("window:minimize"),
    toggleMaximize: () => ipcRenderer.invoke("window:toggle-maximize"),
    close: () => ipcRenderer.invoke("window:close"),
    isMaximized: () => ipcRenderer.invoke("window:is-maximized"),
    onMaximizedChange: (listener) => {
      const wrappedListener = (_, isMaximized) => listener(isMaximized);
      ipcRenderer.on("window:maximized-changed", wrappedListener);

      return () => {
        ipcRenderer.removeListener("window:maximized-changed", wrappedListener);
      };
    },
  },
});
