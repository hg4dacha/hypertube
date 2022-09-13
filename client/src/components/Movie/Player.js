import React from 'react'








export default function Player() {



  return (
    <div className="video-source-content">
        <video
            className="video-source"
            controls
            preload="auto"
            onPlay={() => console.log("PLAY!")}
        >
        <source src='' type="video/webm" />
        </video>
    </div>
  )
}
