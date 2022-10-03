import React, {ChangeEvent, FormEvent, useState} from "react";
import "./PictureGallery.css";
import CheckBox from "./CheckBox";

export default function PictureGallery() {

  //  const {imageInfos, allTags, uploadPicture, addTags} = usePictures();
    const [imagePreload, setPicPreload] = useState<File>();
    const [actualTags, setActualTags] = useState<string[]>();
    const [showTags, setShowTags] = useState<boolean>(false);

    const handleSave = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
   //     return uploadPicture(event.target as HTMLFormElement);
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
        if(!actual.includes(tag)) {
            actual = actual.concat(tag);
            setActualTags(actual);
        }
        console.log(actual);
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

    const handleShowTags = () => {
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
                isActualTag={actualTags?actualTags.includes("withoutTag"):false}
            />
            {//     {allTags ? allTags.map(tag =>
                //             <CheckBox
                //                 key={tag}
                //                 tag={tag}
                //                 deleteTagFromActualTags={deleteTagFromActualTags}
                //                 addTagToActualTags={addTagFromActualTags}
                //                 isActualTag={actualTags?actualTags.includes(tag):false}
                //             />
                //         )
                //         : "keine Tags vorhanden"
                //     }
            }
            <button className={"filterResetButton"}
                    onClick={() => setActualTags(undefined)}> x
            </button>
            Filter aufheben
            <input className={"showTagsButton"} type={"checkbox"}
                   defaultChecked={false}
                   onChange={handleShowTags}/>
            Tags einblenden
        </div>
        <div className={"pictureGalleryContainer"}>
            {//  {imageInfos &&
                //      imageInfos.map(info =>
                //              (
                //                  (actualTags && info.tags.some(tag => actualTags.includes(tag))
                //                  )
                //                  ||
                //                  !actualTags
                //                  ||
                //                  (actualTags.includes("withoutTag") && info.tags.length === 0)
                //              )
                //              && <PictureEntry
                //                  key={info.url}
                //                  info={info}
                //                  addTags={addTags}
                //                  showTags={showTags}
                //              />
                //      )
                //  }
            }
        </div>
        <form className={"pictureUploadForm noPrint"} onSubmit={handleSave}>
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
