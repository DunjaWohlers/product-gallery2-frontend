import React, {useState} from "react";
import "./PictureEntry.css";
import {ImageInfoType} from "../type/ImageInfoType";
import CardInput from "./CardInput";
import TagContainer from "./TagContainer";
import usePictures from "../api/usePictures";

type PictureEntryProps = {
    info: ImageInfoType,
    addTags: (id: ImageInfoType, tags: string[]) => void,
    showImageInfo: boolean,
    actualTags: string[],
}

export default function PictureEntry(props: PictureEntryProps) {
    const [visible, setVisible] = useState<boolean>(false);
    const {deleteImageInfo} = usePictures();

    const toggleVisible = () => {
        visible ? setVisible(false) : setVisible(true);
    }

    return (<>
            {
                (
                    props.actualTags.some(element => props.info.tags.includes(element))
                    ||
                    props.actualTags.includes("withoutTag") && props.info.tags.length === 0
                    ||
                    props.actualTags.length === 0
                )
                &&
                <div className={"card"}>
                    <div className={"imageFrame"} onClick={toggleVisible}>
                        <img className={"cardImage"} src={props.info.image} alt={"img"}/>
                    </div>
                    {props.showImageInfo &&
                        <TagContainer info={props.info}/>
                    }
                    {visible ? <CardInput setVisible={setVisible} addTags={props.addTags} info={props.info}/>
                        : ""
                    }
                    <button onClick={() => deleteImageInfo(props.info)}>löschen</button>
                </div>
            }
        </>
    )
}
