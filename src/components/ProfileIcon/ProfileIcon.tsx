import { FC } from "react";
import CSS from "csstype";

interface IProps {
  img: string;
  alt: string;
  style?: CSS.Properties;
}
const ProfileIcon: FC<IProps> = ({ img, alt, style }) => {
  return (
    <div style={style} className="chat__item_img ">
      <img style={{ borderRadius: "24px" }} src={img} alt={alt} />
    </div>
  );
};

export default ProfileIcon;
