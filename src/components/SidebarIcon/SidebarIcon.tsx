import { FC, useCallback } from "react";

interface IProps {
  icon: any;
  style?: {};
}

const SidebarIcon: FC<IProps> = ({ icon, style }) => {
  return (
    <div style={style} className="sidebar-icon">
      {icon}
    </div>
  );
};
export default SidebarIcon;
