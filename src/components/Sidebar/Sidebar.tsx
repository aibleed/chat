import {
  BiBell,
  FaLocationArrow,
  RiQuestionLine,
  MdRadioButtonUnchecked,
  MdRadioButtonChecked,
} from "react-icons/all";
import SidebarIcon from "../SidebarIcon/SidebarIcon";

const Sidebar = () => {
  return (
    <div className="h-screen w-16 m-0 flex flex-col bg-primary text-secondary shadow">
      <SidebarIcon icon={<BiBell size={30} />} />
      <SidebarIcon icon={<FaLocationArrow size={25} />} />
      <SidebarIcon
        style={{ marginTop: "calc(100vh - 190px)" }}
        icon={<RiQuestionLine size={30} />}
      />
    </div>
  );
};
export default Sidebar;
