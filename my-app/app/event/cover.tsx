"use client"

import { /*JSX,*/ useEffect, useRef } from 'react';
import React from 'react';
import "./event.css"

export default function Cover(){
  
  const map = useRef<HTMLIFrameElement>(null);
  const coverText = [
    {value: "Darrin Communications Center", type: "h1"},
    {value: "Rensselaer Polytechnic Institute ", type: "p"},
    {value: "Troy, NY 12180", type: "p"},
    {value: "    ", type: "span"},

    {value: "Free Parking", type: "h1"},
    {value: "North Lot, Troy, NY 12180", type: "p"},
    {value: "   ", type: "span"},

    {value: "Check in", type: "h1"},
    {value: "at our table inside for a wrist band for food and activites!", type: "p"},
  ]

  useEffect(()=>{
    if(map.current)
      map.current.style.animation = "zoomOut 1s ease-out 0s 1 normal forwards"; //"zoomOut 0.5s ease-out 0s 1 normal forwards";
    if(map.current)
      console.log(map.current.style.animation);
  },[])

  return (
    <div className="flex flex-col desktop:flex-row">
      <div className="mapContainer">
        <iframe ref={map} loading="lazy" allowFullScreen src="https://maps.google.com/maps?q=Darrin+Communication+Center&output=embed"></iframe>
      </div>
      <div className="coverTextContainer z-1">
        {/* <div className="coverBackimg"></div> */}
        {coverText.map((text, i) => {
          //const Tag: JSX.Element = text.type;// as keyof JSX.IntrinsicElements;
          //I know this is now broken but I want it to build sry

          if(text.type === "h1"){
            return (<h1 key={i} className="fade-item lineItem text-base" style={{ '--i': i } as React.CSSProperties}>{text.value}</h1>);
          }else if(text.type === "h2"){
            return (<h2 key={i} className="fade-item lineItem text-xs" style={{ '--i': i } as React.CSSProperties}>{text.value}</h2>);
          }else if(text.type === "p"){
            return (<p key={i} className="fade-item lineItem text-xs" style={{ '--i': i } as React.CSSProperties}>{text.value}</p>);
          }else if(text.type === "span"){
            return (<span key={i} className="fade-item lineItem text-xs" style={{ '--i': i } as React.CSSProperties}>{text.value}</span>);
          }

          return (
            <div key={i} className="fade-item lineItem text-xl" style={{ '--i': i } as React.CSSProperties}>
              {text.value}
              {/* {text.value.split('').map((letter, index) => {
                return (
                  <div className="funLetter" key={index}>
                    {letter === " " ? "\u00A0" : letter}
                  </div>
                );
              })} */}
            </div>
          );
        })}
      </div>
      {/* <img src="/event/DCC.png"></img>
      <img src="/event/LOW.png"></img> */}
    </div>
  );
}