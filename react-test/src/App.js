import logo from './logo.svg';
import './App.css';
import * as mm from '@magenta/music'

function App() {
  const myRef = React.createRef().current.value = 'canvas'
  const JUMP_SONG = {
    notes: [
      { pitch: 62, startTime: 0.5, endTime: 0.75 },
      { pitch: 64, startTime: 1.25, endTime: 1.5 },
      { pitch: 60, startTime: 2.0, endTime: 2.25 },
      { pitch: 60, startTime: 2.75, endTime: 3.0 },
      { pitch: 62, startTime: 3.25, endTime: 3.5 },
      { pitch: 62, startTime: 3.75, endTime: 4.5 },
      { pitch: 64, startTime: 4.5, endTime: 4.75 },
      { pitch: 60, startTime: 5.25, endTime: 5.5 },
      { pitch: 57, startTime: 5.75, endTime: 6.25 },
      { pitch: 55, startTime: 6.25, endTime: 6.75 },
      { pitch: 55, startTime: 6.75, endTime: 8.0 },
    ],
    totalTime: 8
  };
  const player = new mm.Player()
  const viz = new mm.Visualizer(JUMP_SONG, myRef))

  function play() {
    if (player.isPlaying()) {
      player.stop()
    }
    else {
      player.start(JUMP_SONG)
    }
  }

    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <button onClick={play}>Play</button>
            <canvas id="canvas"/>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
    );
}

export default App;
