import axios from "axios";
import {useEffect, useState} from "react";
import {ImageInfo} from "./type/ImageInfo";

export default function usePictures() {

    const [imageInfos, setImageInfos] = useState<ImageInfo[]>();

    const getAllImageInfos = () => {
        axios.get("/api")
            .then(data => setImageInfos(data.data))
    }

    useEffect(() => {
        getAllImageInfos();
    }, [])

    const uploadPicture = (htmlFormElement: HTMLFormElement) => {
        const formData = new FormData(htmlFormElement);
        axios.post("/api/uploadPicture", formData,
        ).then(data => data.data)
            .catch(() => {
                    console.log("Bild konnte nicht gespeichert werden");
                    return [];
                }
            );
    }

    const addTags = (id: string, tags: string[]) => {
        axios.post("/api/addTag/" + id, tags);
    }

    return {imageInfos, uploadPicture, addTags}
}