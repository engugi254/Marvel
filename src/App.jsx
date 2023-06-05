import Footer from "./components/footer";
import MainBody from "./components/main_body";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import BotHeader from "./components/botHeader";

function App() {
  return (
    <div className="main-container">
      <BotHeader />
      <Navbar />

      <MainBody />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
