import { createRoot } from "react-dom/client";
import { App } from "./App";
import "@fontsource/barlow/400.css";
import "@fontsource/barlow/500.css";
import "@fontsource/barlow/600.css";
import "@fontsource/barlow-condensed/500.css";
import "@fontsource/barlow-condensed/600.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/panel.css";
import "./styles/widgets.css";
import "./styles/slider.css";
import "./styles/menu.css";
import "./styles/toast.css";
import "./styles/topbar.css";
import "./styles/help.css";

createRoot(document.getElementById("root")!).render(<App />);
