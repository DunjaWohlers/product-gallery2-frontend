import React, {FormEvent, useState} from "react";
import {ImageInfoType} from "../type/ImageInfoType";

type CardInputProps = {
    setVisible: (is: boolean)=>void,
    info: ImageInfoType,
    addTags: (id: ImageInfoType, tags: string[]) => void,
}

export default function CardInput(props: CardInputProps) {

    const [inputValue, setInputValue] = useState<string>("");

    const handleClick = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("start handle");
        console.log("inputValue:", inputValue);
        let inputString = inputValue.split(" ");
        console.log("tags", props.info.tags.concat(inputString));
        props.addTags(props.info, props.info.tags.concat(inputString));
        props.setVisible(false);
        setInputValue("")
    }

    return (
        <form className={"cardForm"} onSubmit={handleClick}>
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
                <button type={"submit"}> + </button>
            </div>
        </form>
    )
}
