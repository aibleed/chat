import Chat from "./components/Chat/Chat";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <div className="flex box-border">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
