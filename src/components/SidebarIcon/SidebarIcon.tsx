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
      className={
        "relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto shadow-lg bg-gray-800 cursor-pointer text-green-500 hover:bg-green-600 hover:text-white rounded-3xl hover:rounded-xl transition-all duration-300 ease-linear " +
        className
      }
    >
      {icon}
    </button>
  );
});
export default SidebarIcon;
