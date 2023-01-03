import { FC, memo } from "react";

interface IProps {
  icon: any;
  style?: {};
  onClick?: () => void;
  className?: string;
}

const SidebarIcon: FC<IProps> = memo(({ icon, className, style, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={style}
      className={"sidebar-icon " + className}
    >
      {icon}
    </button>
  );
});
export default SidebarIcon;
