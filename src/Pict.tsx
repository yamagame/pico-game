function Pict({ pictId = 0, x = 0, y = 0 }) {
  const pictNo = Math.floor(pictId % 8);
  return (
    <div
      style={{
        position: "absolute",
        top: y * 32,
        left: x * 32,
        display: "inline-block",
        overflow: "hidden",
        width: 32,
        height: 32,
      }}
    >
      <img
        style={{
          position: "relative",
          left: -pictNo * 32,
          top: -pictNo * 32,
        }}
        src="characters.png"
        alt=""
      />
    </div>
  );
}

export default Pict;
