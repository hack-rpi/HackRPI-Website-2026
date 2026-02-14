"use client"

import { useEffect, useRef } from 'react';
import React from 'react';
import "./event.css"

export default function Cover(){
    
    const map = useRef<HTMLIFrameElement>(null);
    const coverText = [
        {value: "Darrin Communications Center", type: "h1"},
        {value: "Rensselaer Polytechnic Institute", type: "h2"},
        {value: "Troy, NY 12180", type: "p"},
        {value: "hidden", type: "h3"},

        {value: "Free Parking", type: "h1"},
        {value: "North Lot, Troy, NY 12180", type: "p"},
        {value: "hidden", type: "h3"},

        {value: "Check In", type: "h1"},
        {value: "Come check in at our entrance table inside!", type: "p"},
        {value: "Participants will get wrist band for food and activities", type: "p"},
    ]

    useEffect(()=>{
        if(map.current)
            map.current.style.animation = "zoomOut 1s ease-out 0s 1 normal forwards"; //"zoomOut 0.5s ease-out 0s 1 normal forwards";
        if(map.current)
            console.log(map.current.style.animation);

    },[])

    return (
        <div style={{ display: "flex"}}>
            <div className="mapContainer">
                <iframe ref={map} loading="lazy" allowFullScreen src="https://maps.google.com/maps?q=Darrin+Communication+Center&output=embed"></iframe>
            </div>
            <div className="coverTextContainer">
                {coverText.map((text, i) => {
                    const Tag = text.type as keyof JSX.IntrinsicElements;

                    return (
                        <div key={i} className="fade-item lineItem" style={{ '--i': i } as React.CSSProperties}>
                            {/* {text.value} */}
                            {text.value.split('').map((letter, index) => {
                                return (
                                    <Tag className="funLetter" key={index}>
                                        {letter === " " ? "\u00A0" : letter}
                                    </Tag>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            {/* <img src="/event/DCC.png"></img>
            <img src="/event/LOW.png"></img> */}
        </div>
    );
}