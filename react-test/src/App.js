import './App.css';
import * as mm from '@magenta/music'
import React from 'react';
import Header from './components/Header';
import { Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Homepage from './components/Homepage';
import TopSamples from './components/TopSamples';
import Register from './components/Register';
import Pagenotfound from './components/Pagenotfound';

function App() {
  /*const myRef = React.createRef().current.value = 'canvas'
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
  const viz = new mm.Visualizer(JUMP_SONG, myRef)

  function play() {
    if (player.isPlaying()) {
      player.stop()
    }
    else {
      player.start(JUMP_SONG)
    }
  }
*/
    return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/topsamples" element={<TopSamples/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="*" element={<Pagenotfound/>} />
        </Routes>
      </div>
    );
}

export default App;
