import PictureEntry from "./PictureEntry";
import React, {FormEvent} from "react";
import usePictures from "../usePictures";

export default function PictureGallery() {

    const {imageInfos, uploadPicture} = usePictures();

    const handleSave = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        return uploadPicture(event.target as HTMLFormElement);
    }

    return <>

        {imageInfos?.map(info => <PictureEntry url={info.url}/>)}
        <form onSubmit={handleSave}>
            <label> Neues Bild hinzufügen: </label>
            <input type={"file"} name={"file"}/>
            <button type={"submit"}> speichern</button>
        </form>
    </>
}
