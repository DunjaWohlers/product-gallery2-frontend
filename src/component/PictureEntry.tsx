import React, {useState} from "react";
import {ImageCard} from "../type/ImageCard";

type PictureEntryProps = {
    info: ImageCard,
    addTags: (id: string, tags: string[]) => void,
}
export default function PictureEntry(props: PictureEntryProps) {
    const [inputValue, setInputValue] = useState<string>("")

    const handleClick = () => {
        let inputString = inputValue.split(" ");
        props.addTags(props.info.publicId, inputString);
    }

    return <>
        <img src={props.info.url} alt={"img"}/>
        {props.info.tags.map(tag=><p key={crypto.randomUUID()}>{tag}</p>)}
        <input type={"text"} onChange={
            (event) =>
                setInputValue(event.target.value)}
        />
        <button onClick={handleClick}> Add Tag to Picture</button>
    </>
}
