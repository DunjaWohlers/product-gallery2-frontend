import React, {ChangeEvent} from "react";

type CheckBoxProps = {
    tag: string,
    deselect: boolean,
    isSelected: boolean,
    addTagToActualTags: (tag: string) => void,
    deleteTagFromActualTags: (tag: string) => void,
}

export default function CheckBox(props: CheckBoxProps) {
    const filter = (event: ChangeEvent<HTMLInputElement>, tag: string) => {
        let checked: boolean = event.target.checked;
        if (checked) {
            props.addTagToActualTags(tag);
        } else {
            props.deleteTagFromActualTags(tag);
        }
    }

    return (
        <>
            <input
                checked={props.deselect ? false : props.isSelected}
                type={"checkbox"}
                onChange={
                    (event) => filter(event, props.tag)
                }
                name={"tag"}
            />
            <label> {props.tag} </label>
        </>
    )
}
