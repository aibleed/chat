import { FC, memo } from "react";

interface IProps {
  icon: any;
  style?: {};
  onClick?: () => void;
}

const SidebarIcon: FC<IProps> = memo(({ icon, style, onClick }) => {
  return (
    <button onClick={onClick} style={style} className="sidebar-icon">
      {icon}
    </button>
  );
});
export default SidebarIcon;
