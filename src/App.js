import React from "react";
import { Replay } from "vimond-replay";
import "vimond-replay/index.css";
import HlsjsVideoStreamer from "vimond-replay/video-streamer/hlsjs";
import ShakaVideoStreamer from "vimond-replay/video-streamer/shaka-player";
function App() {
  
  const replayOptions = {
    videoStreamer: {
      hlsjs: {
        customConfiguration: {
          capLevelToPlayerSize: true,
          maxBufferLength: 45,
        },
      },
    },
  };
  return (
    <Replay
      source="http://rolzwy7.usermd.net/hls/manifest.mpd"
      initialPlaybackProps={replayOptions}
    >
      <ShakaVideoStreamer />
    </Replay>
  );
}

export default App;
