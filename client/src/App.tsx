import { Toaster } from "react-hot-toast";

import './components/i18n/i18n';
import AppRouter from "./components/AppRouter";
import Header from "./components/pages/Header";
import Footer from "./components/pages/Footer";

function App() {
  return (
    <main>
      <Toaster position="bottom-right" />
      <Header/>
      <AppRouter />
      <Footer/>
    </main>
  );
}

export default App;
