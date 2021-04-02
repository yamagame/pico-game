import "./App.css";
import Pict from "Pict";

function App() {
  return (
    <div>
      {/* <Pict pictId={0} x={0} y={0} /> */}
      <img
        src="characters.png"
        alt=""
        style={{ position: "absolute", left: 0, top: 0 }}
      />
    </div>
  );
}

export default App;
