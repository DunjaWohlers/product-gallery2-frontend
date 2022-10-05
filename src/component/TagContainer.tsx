import React from "react";
import {ImageInfoType} from "../type/ImageInfoType";
import usePictures from "../api/usePictures";

type TagContainerProps = {
    info: ImageInfoType,
}

export default function TagContainer(props: TagContainerProps) {
    const maxShownTags = 3;

    const {deleteTag} = usePictures();

    return (
        <div className={"tagContainer"}>
            {props.info.tags.slice(0, maxShownTags)
                .map(tag =>
                    <div onClick={() => deleteTag(props.info, tag)}
                         className="tag"
                         key={
                             crypto.randomUUID()
                         }
                    >
                        {tag}
                    </div>)}
        </div>
    )
}