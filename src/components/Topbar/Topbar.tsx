import { FC, memo } from "react";
import { IFriend } from "../../models/FriendModel";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
interface IProps {
  friend: IFriend;
}
const Topbar: FC<IProps> = memo(({ friend }) => {
  const friendData = () => {
    const friendData = friend?.logoutTime.slice(
      11,
      friend.logoutTime.length - 3
    );
    return friendData || "";
  };

  const content = friend ? (
    <header className="flex flex-col justify-center items-center gap-y-1">
      {" "}
      <ProfileIcon
        img="https://png.pngitem.com/pimgs/s/192-1926160_transparent-ajax-png-anime-profile-png-download.png"
        alt="ProfileIcon"
      />
      <h3 className="text-green-500 font-medium text-2xl capitalize">
        {friend.username}
      </h3>
      <div className="text-white font-light">
        {friend.connected === "true" ? "online" : `Last seen ${friendData()}`}
      </div>
    </header>
  ) : (
    <div>
      <h4 className="text-secondary capitalize font-semibold text-2xl">
        Choose your friend
      </h4>
    </div>
  );
  return (
    <div className="topbar border-b pb-5 gap-2 border-b-gray-600  w-full sm:h-fit flex flex-col items-center justify-center text-center bg-primary">
      {content}
    </div>
  );
});

export default Topbar;
