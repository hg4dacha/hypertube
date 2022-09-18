import React, { useEffect, useState } from 'react';
import axios from 'axios';









export default function Player({
    headers, download, movieId, stream
}) {


    const [subtitles, setSubtitles] = useState(null);

    const subtitlesData = [
        {
            label: "English",
            srcLang: "En",
            src: subtitles && subtitles.englishSubtitles ? subtitles.englishSubtitles : null
        },
        {
            label: "Français",
            srcLang: "Fr",
            src: subtitles && subtitles.frenchSubtitles ? subtitles.frenchSubtitles : null
        },
        {
            label: "Deutsch",
            srcLang: "De",
            src: subtitles && subtitles.germanSubtitles ? subtitles.germanSubtitles : null
        }
    ]


    useEffect( () => {

        if (download) {
            axios.get(`movies/subtitles/${movieId}`, { headers: headers })
            .then( (response) => {
                setSubtitles(response.data);
            })
            .catch( (error) => {})
        }
    
    // eslint-disable-next-line
    }, [download, movieId])

  return (
    <div className="video-source-content">
        <video
            className="video-source"
            controls
            preload="auto"
            crossOrigin="anonymous"
            autoPlay={false}
            onPlay={() => null}
        >
            <source src={stream} type="video/webm" />
            {
                subtitles &&
                subtitlesData.map( (subtitle, index) => {
                    if (subtitle.src) {
                        return (
                            <track
                                key={index}
                                label={subtitle.label}
                                kind="subtitles"
                                srcLang={subtitle.srcLang}
                                src={subtitle.src}
                            />
                        )
                    } else return null;
                })
            }
        </video>
    </div>
  )
}