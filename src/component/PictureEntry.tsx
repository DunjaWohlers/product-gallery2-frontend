import React from "react";

type PictureEntryProps = {
    url: string,
}
export default function PictureEntry(props:PictureEntryProps){
    return <p>
        <img src={props.url} alt={"img"}/>
    </p>
}
