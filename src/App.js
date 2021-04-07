import React from "react";
import { render } from "react-dom";
import { Replay } from "vimond-replay";
import "vimond-replay/index.css";

// import HlsjsVideoStreamer from "vimond-replay/video-streamer/hlsjs";
import ShakaVideoStreamer from 'vimond-replay/video-streamer/shaka-player';


// Check the Dev tools console for the log output from this handler:
const handleStreamStateChange = stateProperties => {
  if (stateProperties) {
    if ('position' in stateProperties) {
      console.log(
        'Stream observation example: Playback position is ' +
        stateProperties.position.toFixed(1),
      )
    }
    if ('volume' in stateProperties) {
      console.log(
        'Stream observation example: Volume is ' +
        Math.round(stateProperties.volume * 100),
      )
    }
    if (stateProperties.isPaused) {
      console.log('Stream observation example: The playback was paused.')
    }
    if (stateProperties.isPaused === false) {
      console.log('Stream observation example: The playback was resumed.')
    }
    if (stateProperties.playState === 'inactive') {
      console.log('Stream observation example: The playback has ended.')
    }
  }
}



function App() {
  const replayOptions = {
    videoStreamer: {
      shaka: {
        customConfiguration: {
          streaming: {
            bufferingGoal: 120
          }
        }
      }
    }
  };
  const source = {
    streamUrl: "http://127.0.0.1:8080/manifest.mpd",
  };
  return (
    <React.StrictMode>
      <div style={{ width: "640px" }}>
        <Replay
          source={source}
          initialPlaybackProps={replayOptions}
          onStreamStateChange={handleStreamStateChange}
        >
          <ShakaVideoStreamer />
        </Replay>
      </div>
    </React.StrictMode >
  );
}

render(<App />, document.querySelector("#root"));
