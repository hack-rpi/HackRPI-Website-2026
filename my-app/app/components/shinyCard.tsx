

import { useEffect } from "react";
import "./shinyCard.css";

export default function({image, theme}: any){

    

    return (
        <>

            <div className="shinyCard">
                Hello
                <img src={image}></img>
            </div>

        </>
    );
}