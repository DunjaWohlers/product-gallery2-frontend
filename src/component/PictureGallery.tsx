import React, {ChangeEvent, FormEvent, useState} from "react";
import "./PictureGallery.css";
import CheckBox from "./CheckBox";
import {InitialImageInfo} from "../type/ImageInfoType";
import PictureEntry from "./PictureEntry";
import {Storage} from "aws-amplify";
import usePictures from "../api/usePictures";


export default function PictureGallery() {

    const initialFormState = {name: '', tags: [], image: ''}
    const {imageInfoList, allTags, createImageInfo, addTags, imageUpload} = usePictures();

    const [imagePreload, setPicPreload] = useState<File>();
    const [actualTags, setActualTags] = useState<string[]>([]);
    const [showTags, setShowTags] = useState<boolean>(false);
    const [formData, setFormData] = useState<InitialImageInfo>(initialFormState);

    const previewImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0])
            setPicPreload(event.target.files[0])
    }

    const addNewImageInfo = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (imagePreload) {
            await savePicture();
            const url = await getPictureUrl(imagePreload)
            const newFormData = {name: formData.name, tags: formData.tags, image: url};
            await createImageInfo(newFormData);
            setFormData(initialFormState);
            setPicPreload(undefined);
        }
    }

    const savePicture = async () => {
        const file = imagePreload;
        console.log(file);
        if (file) {
            await imageUpload(file)
        }
    }

    const getPictureUrl = async (file: File) => {
        return await Storage.get(file.name);
    }

    const addTagFromActualTags = (tag: string) => {
        let actual = actualTags;
        if (!actual) {
            actual = [];
        }
        if (!actual.includes(tag)) {
            actual = actual.concat(tag);
            setActualTags(actual);
        }
    }

    const deleteTagFromActualTags = (tag: string) => {
        let actual = actualTags;
        if (!actual) {
            actual = [];
        }
        actual = actual.filter(element => (element !== tag));
        setActualTags(actual);
        if (actual.length === 0) {
            setActualTags([]);
        }
    }

    const toggleShowTags = () => {
        showTags
            ? setShowTags(false)
            : setShowTags(true)
    }

    return <>
        <div className={"noPrint tagsFilterFormContainer"}>
            <CheckBox
                tag={"ohne Tag"}
                deleteTagFromActualTags={deleteTagFromActualTags}
                addTagToActualTags={addTagFromActualTags}
                isActualTag={actualTags ? actualTags.includes("withoutTag") : false}
            />
            {allTags ? allTags.map(tag =>
                    <CheckBox
                        key={tag}
                        tag={tag}
                        deleteTagFromActualTags={deleteTagFromActualTags}
                        addTagToActualTags={addTagFromActualTags}
                        isActualTag={actualTags ? actualTags.includes(tag) : false}
                    />
                )
                : "keine Tags vorhanden"
            }
            <button className={"filterResetButton"}
                    onClick={() => setActualTags([])}> x
            </button>
            Filter aufheben
            <input className={"showTagsButton"} type={"checkbox"}
                   defaultChecked={false}
                   onChange={toggleShowTags}/>
            Tags einblenden
        </div>

        <div className={"pictureGalleryContainer"}>
            {
                imageInfoList?.map((imageInfo) => (
                    <PictureEntry
                        key={imageInfo.id}
                        info={imageInfo}
                        addTags={addTags}
                        showImageInfo={showTags}
                        actualTags={actualTags}
                    />
                ))
            }
        </div>
        <form className={"pictureUploadForm noPrint"} onSubmit={addNewImageInfo}>
            <label> Neues Bild hinzufügen: </label>
            <div>
                <input type={"file"} name={"file"} onChange={previewImage}/>
                <button type={"submit"}> +</button>
            </div>
        </form>
        <div className={"previewContainer"}>
            {imagePreload &&
                <img src={URL.createObjectURL(imagePreload)} alt={"picture with Name:" + imagePreload.name}/>}
        </div>
    </>
}
