import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux'
import store from './context/store.ts'
import "./index.css";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import CheckLoginStatus from "./services/utils/checkLoginStatus.ts";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <AppWrapper>
          <App />
        </AppWrapper>
      </ThemeProvider>
      <CheckLoginStatus/>
    </Provider>
  </StrictMode>
);
