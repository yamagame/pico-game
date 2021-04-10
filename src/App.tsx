import React from "react";
import "./App.css";
import Pict from "Pict";

interface SoundPlayer {
  play: (mml: string, track: number) => void;
  stop: (track: number) => void;
}
const Sound: SoundPlayer = (window as any).SOUND;

enum KEYCODE {
  UP = "ArrowUp",
  DOWN = "ArrowDown",
  LEFT = "ArrowLeft",
  RIGHT = "ArrowRight",
  SPACE = "Space",
}

enum BG {
  BLOCK = 0,
  ROCK = 3,
  PLAYER = 23,
}

enum SE {
  move = "@15-1o5l16v9cd",
}

interface Object {
  x: number;
  y: number;
}

const mapSize = { width: 11, height: 11 };

const initialMapData = () => {
  const mapData = [];
  const { width, height } = mapSize;
  for (var y = 0; y < height; y++) {
    const line = [];
    for (var x = 0; x < width; x++) {
      if (Math.random() < 0.1) {
        line.push(BG.ROCK);
      } else {
        line.push(BG.BLOCK);
      }
    }
    mapData.push(line);
  }
  return mapData;
};

function App() {
  const [mapData, setMapData] = React.useState(initialMapData());
  const [player, setPlayer] = React.useState({ x: 5, y: 5 } as Object);
  React.useEffect(() => {
    const onKeyDown = function (e: KeyboardEvent) {
      let x = player.x;
      let y = player.y;
      switch (e.code) {
        case KEYCODE.UP:
          if (y > 0) y--;
          Sound.play(SE.move, 0);
          break;
        case KEYCODE.DOWN:
          if (y < mapSize.height - 1) y++;
          Sound.play(SE.move, 0);
          break;
        case KEYCODE.LEFT:
          if (x > 0) x--;
          Sound.play(SE.move, 0);
          break;
        case KEYCODE.RIGHT:
          if (x < mapSize.width - 1) x++;
          Sound.play(SE.move, 0);
          break;
        case KEYCODE.SPACE:
          break;
      }
      if ((x !== player.x || y !== player.y) && mapData[y][x] === BG.BLOCK) {
        setPlayer({ ...player, x, y });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [player, mapData]);
  const onClickHandler = (x: number, y: number) => {
    return () => {
      mapData[y][x] = BG.ROCK;
      setMapData([...mapData]);
    };
  };
  return (
    <div>
      {mapData.map((line, y) => {
        return line.map((ch, x) => (
          <Pict
            key={`${x}-${y}`}
            onClick={onClickHandler(x, y)}
            pictId={ch}
            x={x}
            y={y}
          />
        ));
      })}
      <Pict pictId={BG.PLAYER} x={player.x} y={player.y} />
    </div>
  );
}

export default App;
