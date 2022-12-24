import ProfileIcon from "../ProfileIcon/ProfileIcon";

const Topbar = () => {
  return (
    <div className="topbar border-b py-5 gap-2 border-b-gray-600 w-full h-fit flex flex-col items-center justify-center text-center bg-primary">
      <ProfileIcon
        img="https://png.pngitem.com/pimgs/s/192-1926160_transparent-ajax-png-anime-profile-png-download.png"
        alt="ProfileIcon"
      />
      <h3 className="text-green-500 font-medium text-2xl">Ishika Gupta</h3>
      <div className="text-white font-light">Last seen Today at 11:11 AM</div>
    </div>
  );
};

export default Topbar;
