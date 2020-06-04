import React from 'react'
import YouTube from 'react-youtube'

class Background extends React.Component {

  onReady(event) {
    // access to player in all event handlers via event.target
    event.target.mute()
  }

  onPlay(event) {

    event.target.mute()
    document.getElementById("player").classList.add("fadeIn")
    document.getElementById("mission-patch").classList.remove("fadeIn")
    document.getElementById("mission-patch").classList.add("fadeOut")

  }

  render() {
    var opts = {
      height: '100%',
      width: '100%',
      playerVars: {
        controls: 0,
        volume: 0,
        autoplay: 1,
        loop: 1,
        start: '89',
        end: '1h32m',
        playsinline: 1,
        modestbranding: 1,
        enablejsapi: 1,
        disablekb: 1,
      },
    }

    return (
      
      <div id="background">
        <div id="mission-patch"></div>
        <YouTube id="player" videoId="7KXGZAEWzn0" opts={opts} onReady={this.onReady} onPlay={this.onPlay} />

      </div>

    );

  }
}

export default Background;