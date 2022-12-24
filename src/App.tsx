import Chat from "./components/Chat/Chat";
import MainChat from "./components/MainChat/MainChat";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="App scroll-smooth box-border">
      <div className="flex box-border bg-primary">
        <Sidebar />
        <Chat />
        <MainChat />
      </div>
    </div>
  );
}

export default App;
