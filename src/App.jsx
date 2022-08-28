import './App.css'
import React from 'react';
import { useTimer } from 'react-timer-hook';
import useSound from 'use-sound';
import magicBells from './sounds/Magic-Bells.wav'

// Default start time
var setTime = 25;
var paused = false;
function MyTimer({ expiryTimestamp }) {

  {/* Timer alarm */}
  const [timesUp, { stop }] = useSound(magicBells, { loop: true });


  {/* Timer Pause/Resume */}
  function PauseResume() {
    if (paused == true) {
      resume()
      paused = false;
    } else {
      pause()
      paused = true;
    }
  }
  
  const {
    seconds,
    minutes,
    hours,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp, autoStart: false, onExpire: () => {
      timesUp();
      Break();
    }
  });

  const formatTime = (time) => {
    return String(time).padStart(2, '0')
  }

  document.querySelectorAll('input[type="range"]').forEach((input) => { 
    input.addEventListener('mousedown',  () => window.getSelection().removeAllRanges());
});

  function fetchTime(min) {
    const time = new Date();
    time.setMinutes(time.getMinutes() + Number(min));
    return time
  }

  function updateTime() {
    var no = document.querySelector('#duration').value;
    setTime = Number(no);
    document.querySelector('#disDuration').innerText = no + " mins";
  }

  function Break() {
    document.querySelector('#disDuration').innerText = "Time for a break!";
    document.querySelector('body').style.background = "#A8C4C7";
    document.querySelector('.pomo').style.background = "#A8C4C7";
    document.querySelector('.pomo').style.boxShadow = " 20px 20px 60px #8fa7a9, -20px -20px 60px #c1e1e5"
  }

  function startPomo() {
    document.querySelector(".watchFace").style.display = "block";
    document.querySelector(".timeSetter").style.display = "none";
    document.querySelector("#start-btn").style.display = "none";
    document.querySelector("#resume-btn").style.display = "initial";
    document.querySelector("#stop-btn").style.display = "initial";
    document.querySelector('body').style.background = "#A3D5FF";
    document.querySelector('.pomo').style.background = "#A3D5FF";
    document.querySelector('.pomo').style.boxShadow = "26px 26px 53px #8bb5d9, -26px -26px 53px #bbf5ff";
  }

  function stopPomo() {
    stop();
    document.querySelector(".watchFace").style.display = "none";
    document.querySelector(".timeSetter").style.display = "initial";
    document.querySelector("#start-btn").style.display = "initial";
    document.querySelector("#resume-btn").style.display = "none";
    document.querySelector("#stop-btn").style.display = "none";
  }

  return (
    <div className='pomo'>
      {/* Input Tasks*/}
      <input
        className='taskInput'
        placeholder='Insert task here'
        autoComplete='false'
        autoFocus
        >
      </input>

      
      {/* Timer Setter*/}
      <div className="timeSetter">
        <h2 id="disDuration">25 mins</h2>
        <input
          id="duration"
          type="range"
          min="10"
          max="60"
          step="5"
          defaultValue={"25"}
          onChange={updateTime}>
        </input>
      </div>

      {/* Display*/}
      <div className="watchFace" style={{ display: 'none' }}>
        <span>{formatTime(hours)}:</span>
        <span>{formatTime(minutes)}:</span>
        <span>{formatTime(seconds)}</span>
      </div>

      {/* Buttons*/}
      <div>
        <button id="start-btn" onClick={() => {
          restart(fetchTime(setTime))
          startPomo()
        }}>Start</button>
        <button id="resume-btn" onClick={PauseResume} style={{ display: 'none' }}>Play/Pause</button>
        <button id="stop-btn" onClick={() => {stopPomo()}} style={{ display: 'none' }}>Stop</button>
      </div>
    </div>


  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    {/*Default start value*/}
    this.state = {
      setTime: 30,
    }
  }


  render() {
    const time = new Date();
    time.setMinutes(time.getMinutes() + this.state.setTime);
    return (
      <main>
        <MyTimer expiryTimestamp={time} />
      </main>
    )
  }

}

export default App