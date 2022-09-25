import React, {ChangeEvent} from "react";

type CheckBoxProps = {
    tag: string,
    addTagToActualTags: (tag: string) => void,
    deleteTagFromActualTags: (tag: string) => void,
    isActualTag: boolean,
}

export default function CheckBox(props: CheckBoxProps) {

    const filter = (event: ChangeEvent<HTMLInputElement>) => {
        let checked: boolean = event.target.checked;
        const thisTag = props.tag==="ohne Tag" ? "withoutTag" : props.tag;

        if (checked) {
            props.addTagToActualTags(thisTag);
        } else {
            props.deleteTagFromActualTags(thisTag);
        }
    }

    return (
        <>
            <input
                checked={props.isActualTag}
                type={"checkbox"}
                onChange={filter}
                name={"tag"}
            />
            <label> {props.tag} </label>
        </>
    )
}
