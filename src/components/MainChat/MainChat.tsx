import { FC } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { getFriends } from "../../redux/slices/chatSlice";
import Dialogue from "../Dialogue/Dialogue";
import Topbar from "../Topbar/Topbar";
const MainChat: FC<{ active: boolean }> = ({ active }) => {
  const friend = useAppSelector(getFriends);
  const toggleView = active ? "invisible opacity-0" : " ";
  return (
    <section
      className={
        "w-full h-full flex flex-col py-4 border-l sm:visible sm:opacity-100 sm:relative transition-all ease-in duration-300 border-l-gray-600 bg-primary overflow-hidden " +
        toggleView
      }
    >
      <Topbar friend={friend} />
      <Dialogue />
    </section>
  );
};

export default MainChat;
