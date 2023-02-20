import { FaLocationArrow, ImCross, CgAdd, TbFriends } from "react-icons/all";
import { useCallback, FC, SetStateAction, Dispatch, useState } from "react";
import SidebarIcon from "../SidebarIcon/SidebarIcon";
import AddNewFriend from "../AddNewFriend/AddNewFriend";
import { useAppDispatch } from "../../hooks/hooks";
import { chatActions } from "../../redux/slices/chatSlice";
import { useNavigate } from "react-router-dom";

interface IProps {
  setActive: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: FC<IProps> = ({ setActive }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [modalActive, setModal] = useState(false);
  const onClick = useCallback(() => {
    setActive((prev) => !prev);
  }, []);
  const onAddFriend = useCallback(async () => {
    setModal((prev) => !prev);
  }, [modalActive]);
  const onQuit = useCallback(async () => {
    if (window.confirm("Are you sure you wanna logout?")) {
      localStorage.removeItem("token");
      dispatch(chatActions.disconnect());
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div className="h-screen relative w-16 m-0 flex flex-col bg-primary z-10 text-secondary px-2">
        {/* <SidebarIcon icon={<BiBell size={30} />} /> */}
        <div>
          <SidebarIcon onClick={onAddFriend} icon={<CgAdd size={25} />} />
          <SidebarIcon onClick={onClick} icon={<FaLocationArrow size={25} />} />
          <SidebarIcon
            onClick={onQuit}
            style={{ position: "absolute", bottom: "0" }}
            icon={<ImCross size={20} />}
          />
        </div>
      </div>
      <AddNewFriend modal={modalActive} setModal={setModal} />
    </>
  );
};
export default Sidebar;
