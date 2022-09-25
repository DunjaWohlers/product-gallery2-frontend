import React, {useState} from "react";
import {ImageCard} from "../type/ImageCard";
import "./PictureEntry.css";

type PictureEntryProps = {
    info: ImageCard,
    addTags: (id: string, tags: string[]) => void,
    showTags: boolean,
}

export default function PictureEntry(props: PictureEntryProps) {
    const [inputValue, setInputValue] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);

    const handleClick = () => {
        let inputString = inputValue.split(" ");
        props.addTags(props.info.publicId, inputString);
        setInputValue("")
    }

    const toggleVisible = () => {
        visible? setVisible(false): setVisible(true);
    }

    return (
        <div className={"card"}>
            <div className={"imageFrame"} onClick={toggleVisible}>
                <img className={"cardImage"} src={props.info.url} alt={"img"}/>
            </div>
            {props.showTags && <div className={"tagContainer"}>
                {props.info.tags.map(tag =>
                    <div className="tag" key={crypto.randomUUID()}>{tag}</div>)}
            </div>
            }
            {visible ? <form className={"cardForm"} onSubmit={handleClick}>
                    <label className={"cardLabel"}> Neuer Tag: </label>
                    <div>
                        <input
                            className={"cardInput"}
                            type={"text"}
                            onChange={
                                (event) =>
                                    setInputValue(event.target.value)
                            }
                            value={inputValue}
                        />
                        <button type={"submit"}> +</button>
                    </div>
                </form>
                : ""
            }
        </div>
    )
}
