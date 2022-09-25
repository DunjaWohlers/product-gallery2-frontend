import PictureEntry from "./PictureEntry";
import React, {ChangeEvent, FormEvent, useState} from "react";
import usePictures from "../api/usePictures";
import "./PictureGallery.css";
import CheckBox from "./CheckBox";

export default function PictureGallery() {

    const {imageInfos, allTags, uploadPicture, addTags} = usePictures();
    const [imagePreload, setPicPreload] = useState<File>();
    const [actualTags, setActualTags] = useState<string[]>();

    const handleSave = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        return uploadPicture(event.target as HTMLFormElement);
    }

    const previewImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0])
            setPicPreload(event.target.files[0])
    }

    const addTagFromActualTags = (tag: string) => {
        let actual = actualTags;
        if (!actual) {
            actual = [];
        }
        actual = actual.concat(tag);
        setActualTags(actual);
    }

    const deleteTagFromActualTags = (tag: string) => {
        let actual = actualTags;
        if (!actual) {
            actual = [];
        }
        actual = actual.filter(element => (element !== tag));
        setActualTags(actual);
        if (actual.length === 0) {
            setActualTags(undefined);
        }
    }

    return <>
        <div className={"noPrint tagsFilterFormContainer"}>
            {allTags ? allTags.map(tag =>
                    <CheckBox
                        tag={tag}
                        deleteTagFromActualTags={deleteTagFromActualTags}
                        addTagToActualTags={addTagFromActualTags}
                        deselect={!actualTags}
                        isSelected={actualTags ? actualTags.includes(tag) : false}
                    />
                )
                : "keine Tags vorhanden"
            }
            <button className={"filterResetButton"} onClick={() => setActualTags(undefined)}> x</button>
            Filter aufheben
        </div>
        <div className={"pictureGalleryContainer"}>
            {imageInfos?.map(info =>
                    (
                        (actualTags && info.tags.some(tag => actualTags.includes(tag))
                        )
                        ||
                        !actualTags
                    )
                    && <PictureEntry
                        key={info.url}
                        info={info}
                        addTags={addTags}
                    />
            )}
        </div>
        <form className={"pictureUploadForm noPrint"} onSubmit={handleSave}>
            <label> Neues Bild hinzufügen: </label>
            <div>
                <input type={"file"} name={"file"} onChange={previewImage}/>
                <button type={"submit"}> +</button>
            </div>
        </form>
        <div className={"previewContainer"}>
            {imagePreload && <img src={URL.createObjectURL(imagePreload)} alt={"picture with Name:" + imagePreload.name}/>}
        </div>
    </>
}
