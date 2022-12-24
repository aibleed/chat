import ProfileIcon from "../ProfileIcon/ProfileIcon";

const Dialogue = () => {
  return (
    <div className="w-full h-max bg-primary px-32 relative">
      <h6 className="Dialogue__data text-gray-400 font-thin capitalize text-center my-3">
        Today, 9:00 AM
      </h6>
      <div className="flex justify-between">
        <div className="Dialogue__friendMessage relative bg-gray-700 text-white w-96 rounded-lg h-max py-2 px-4">
          <ProfileIcon
            style={{
              position: "absolute",
              left: "-60px",
              top: "0px",
            }}
            img="https://png.pngitem.com/pimgs/s/192-1926160_transparent-ajax-png-anime-profile-png-download.png"
            alt="icon"
          />

          <div>
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
        </div>
        <div className="Dialogue__myMessage bg-blue-100 w-96 h-max py-2 px-4 text-black rounded-lg mt-5">
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
          cillum sint consectetur cupidatat.
        </div>
      </div>
    </div>
  );
};

export default Dialogue;
