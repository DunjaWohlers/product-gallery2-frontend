import React, {useState} from "react";
import {ImageInfo} from "../type/ImageInfo";

type PictureEntryProps = {
    info: ImageInfo,
    addTags: (id: string, tags: string[]) => void,
}
export default function PictureEntry(props: PictureEntryProps) {
    const [inputValue, setInputValue] = useState<string>("")

    const handleClick = () => {
        let inputString = inputValue.split(" ");
        props.addTags(props.info.publicId, inputString);
    }

    return <p>
        <img src={props.info.url} alt={"img"}/>
        <input type={"text"} onChange={
            (event) =>
                setInputValue(event.target.value)}
        />
        <button onClick={handleClick}> Add Tag to Picture</button>
    </p>
}
