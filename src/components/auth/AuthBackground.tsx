import React from 'react';

const AuthBackground = () => {
  return (
    <div className="absolute inset-0 opacity-50">
      <div className="absolute inset-0 bg-[#282828] blur-[3px]">
        {/* Animated gradient lines - converted to responsive viewport units */}
        <div
          className="absolute w-px h-[120vh] bg-zentag-gradient transform -rotate-[15deg]"
          style={{ left: "min(126px, 9.2vw)", top: "min(277px, 29.6vh)" }}
        ></div>
        <div
          className="absolute w-px h-[120vh] bg-zentag-gradient transform rotate-[2.483deg]"
          style={{ left: "min(320px, 23.4vw)", top: "min(255px, 27.3vh)" }}
        ></div>
        <div
          className="absolute w-px h-[120vh] bg-zentag-gradient transform -rotate-[105deg]"
          style={{ left: "min(8px, 0.6vw)", top: "min(276px, 29.5vh)" }}
        ></div>
        <div
          className="absolute w-px h-[120vh] bg-zentag-gradient transform -rotate-[94.819deg]"
          style={{ left: "0px", top: "min(759px, 81.2vh)" }}
        ></div>
        <div
          className="absolute w-px h-[120vh] bg-zentag-gradient transform -rotate-[120deg]"
          style={{ left: "min(84px, 6.1vw)", top: "min(725px, 77.5vh)" }}
        ></div>
        <div
          className="absolute w-px h-[120vh] bg-zentag-gradient transform rotate-[165deg]"
          style={{ left: "min(772px, 56.5vw)", top: "min(100px, 10.7vh)" }}
        ></div>
        <div
          className="absolute w-px h-[120vh] bg-zentag-gradient transform rotate-[165deg]"
          style={{ left: "min(587px, 43vw)", top: "min(699px, 74.8vh)" }}
        ></div>
        <div
          className="absolute w-px h-[120vh] bg-zentag-gradient transform -rotate-[165deg]"
          style={{ left: "min(1309px, 95.8vw)", top: "min(354px, 37.9vh)" }}
        ></div>
        <div
          className="absolute w-px h-[120vh] bg-zentag-gradient transform rotate-[150deg]"
          style={{ left: "min(1242px, 91vw)", top: "min(418px, 44.7vh)" }}
        ></div>
        <div
          className="absolute w-px h-[120vh] bg-zentag-gradient transform rotate-[150deg]"
          style={{ left: "min(1372px, 100.4vw)", top: "min(24px, 2.6vh)" }}
        ></div>
        <div
          className="absolute w-px h-[120vh] bg-zentag-gradient"
          style={{ left: "min(1909px, 139.8vw)", top: "0px" }}
        ></div>

        {/* Gradient dots - responsive positioning */}
        <div
          className="absolute w-3.5 h-3.5 rounded-full bg-zentag-gradient"
          style={{ left: "min(476px, 34.9vw)", top: "min(477px, 51vh)" }}
        ></div>
        <div
          className="absolute w-3.5 h-3.5 rounded-full bg-zentag-gradient"
          style={{ left: "min(593px, 43.4vw)", top: "min(738px, 78.9vh)" }}
        ></div>
        <div
          className="absolute w-3.5 h-3.5 rounded-full bg-zentag-gradient"
          style={{ left: "min(1058px, 77.5vw)", top: "min(1186px, 126.8vh)" }}
        ></div>
        <div
          className="absolute w-3.5 h-3.5 rounded-full bg-zentag-gradient"
          style={{ left: "min(245px, 17.9vw)", top: "min(738px, 78.9vh)" }}
        ></div>
        <div
          className="absolute w-3.5 h-3.5 rounded-full bg-zentag-gradient"
          style={{ left: "min(339px, 24.8vw)", top: "min(947px, 101.3vh)" }}
        ></div>
        <div
          className="absolute w-3.5 h-3.5 rounded-full bg-zentag-gradient"
          style={{ left: "min(864px, 63.3vw)", top: "min(459px, 49.1vh)" }}
        ></div>
        <div
          className="absolute w-3.5 h-3.5 rounded-full bg-zentag-gradient"
          style={{ left: "min(1004px, 73.5vw)", top: "min(776px, 83vh)" }}
        ></div>
        <div
          className="absolute w-3.5 h-3.5 rounded-full bg-zentag-gradient"
          style={{ left: "min(1323px, 96.9vw)", top: "min(564px, 60.3vh)" }}
        ></div>
        <div
          className="absolute w-3.5 h-3.5 rounded-full bg-zentag-gradient"
          style={{
            left: "min(1388px, 101.7vw)",
            top: "min(1278px, 136.7vh)",
          }}
        ></div>
        <div
          className="absolute w-3.5 h-3.5 rounded-full bg-zentag-gradient"
          style={{
            left: "min(1671px, 122.4vw)",
            top: "min(1167px, 124.8vh)",
          }}
        ></div>
        <div
          className="absolute w-3.5 h-3.5 rounded-full bg-zentag-gradient"
          style={{ left: "min(1820px, 133.3vw)", top: "min(805px, 86.1vh)" }}
        ></div>
      </div>

      {/* Large blurred gradient - responsive sizing */}
      <div className="absolute w-[min(1895px,138.8vw)] h-[min(512px,54.8vh)] rounded-full opacity-40 bg-zentag-gradient blur-[93.75px] left-3 bottom-0"></div>
    </div>
  );
};

export default AuthBackground;