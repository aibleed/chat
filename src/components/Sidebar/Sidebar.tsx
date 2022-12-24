import {
  BiBell,
  FaLocationArrow,
  RiQuestionLine,
  MdRadioButtonUnchecked,
  MdRadioButtonChecked,
} from "react-icons/all";
import { useCallback } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { chatHandler } from "../../redux/slices/sidebarSlice";
import SidebarIcon from "../SidebarIcon/SidebarIcon";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const onClick = useCallback(() => {
    dispatch(chatHandler());
  }, []);
  return (
    <div className="h-screen w-16 m-0 flex flex-col bg-primary z-10 text-secondary shadow px-2">
      <SidebarIcon icon={<BiBell size={30} />} />
      <SidebarIcon onClick={onClick} icon={<FaLocationArrow size={25} />} />
      <SidebarIcon
        style={{ marginTop: "calc(100vh - 190px)" }}
        icon={<RiQuestionLine size={30} />}
      />
    </div>
  );
};
export default Sidebar;
