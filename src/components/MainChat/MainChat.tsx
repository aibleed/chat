import { useAppSelector } from "../../hooks/hooks";
import { getFriends } from "../../redux/slices/chatSlice";
import Dialogue from "../Dialogue/Dialogue";
import Topbar from "../Topbar/Topbar";
const MainChat = () => {
  const friend = useAppSelector(getFriends);
  return (
    <section className="h-screen w-screen border-l border-l-gray-600 bg-primary overflow-hidden ">
      <Topbar friend={friend} />
      <Dialogue />
    </section>
  );
};

export default MainChat;
