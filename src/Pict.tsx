type Props = {
  pictId: number;
  x: number;
  y: number;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
};

function Pict({ pictId = 0, x = 0, y = 0, onClick }: Props) {
  const pictX = Math.floor(pictId % 8);
  const pictY = Math.floor(pictId / 8);
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
        imageRendering: "pixelated",
        userSelect: "none",
      }}
      onClick={onClick}
    >
      <img
        style={{
          position: "relative",
          left: -pictX * 32,
          top: -pictY * 32,
          pointerEvents: "none",
        }}
        src="characters.png"
        alt=""
      />
    </div>
  );
}

export default Pict;
