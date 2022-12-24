import Dialogue from "../Dialogue/Dialogue";
import Topbar from "../Topbar/Topbar";

const MainChat = () => {
  return (
    <div className="h-screen w-screen border-l border-l-gray-600 bg-primary overflow-hidden ">
      <Topbar />
      <Dialogue />
    </div>
  );
};

export default MainChat;
