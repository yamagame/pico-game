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
  BLOCK = 6,
  ROCK = 3,
  PLAYER = 23,
  KEY = 11,
}

enum SE {
  move = "@0-0 o5 l16 v12 cd",
}

interface Object {
  x: number;
  y: number;
}

const mapSize = { width: 21, height: 21 };

const initialMapData = () => {
  const mapData = [];
  const { width, height } = mapSize;
  for (let y = 0; y < height; y++) {
    const line = [];
    for (let x = 0; x < width; x++) {
      line.push(BG.BLOCK);
    }
    mapData.push(line);
  }
  for (let y = 2; y < height - 2; y += 2) {
    for (let x = 2; x < width - 2; x += 2) {
      mapData[y][x] = BG.ROCK;
    }
  }
  for (let x = 0; x < width; x++) {
    mapData[0][x] = BG.ROCK;
    mapData[mapSize.height - 1][x] = BG.ROCK;
  }
  for (let y = 0; y < height; y++) {
    mapData[y][0] = BG.ROCK;
    mapData[y][mapSize.width - 1] = BG.ROCK;
  }
  for (let y = 2; y < height - 2; y += 2) {
    for (let x = 2; x < width - 2; x += 2) {
      if (mapData[y][x] === BG.ROCK) {
        const d = [-1, 1];
        const dd = [];
        for (let iy = 0; iy < 2; iy++) {
          if (mapData[y + d[iy]][x] !== BG.ROCK) {
            if (y !== 2 && d[iy] === -1) continue;
            dd.push([y + d[iy], x]);
          }
        }
        for (let ix = 0; ix < 2; ix++) {
          if (mapData[y][x + d[ix]] !== BG.ROCK) {
            dd.push([y, x + d[ix]]);
          }
        }
        if (dd.length > 0) {
          const id = Math.floor(Math.random() * dd.length);
          mapData[dd[id][0]][dd[id][1]] = BG.ROCK;
        }
      }
    }
  }
  return mapData;
};

function App() {
  const [mapData, setMapData] = React.useState(initialMapData());
  const [player, setPlayer] = React.useState({ x: 1, y: 1 } as Object);
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
      <Pict pictId={BG.KEY} x={mapSize.width - 2} y={mapSize.height - 2} />
      <Pict pictId={BG.PLAYER} x={player.x} y={player.y} />
    </div>
  );
}

export default App;
