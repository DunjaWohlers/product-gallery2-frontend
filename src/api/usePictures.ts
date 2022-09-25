import axios from "axios";
import {useEffect, useState} from "react";
import {ImageCard} from "../type/ImageCard";

export default function usePictures() {

    const [imageInfos, setImageInfos] = useState<ImageCard[]>();
    const [allTags, setAllTags] = useState<string[]>();

    useEffect(() => {
        getAllImageInfos();
    }, )

    const getAllImageInfos = () => {
        axios.get("/api")
            .then(data => {
                setImageInfos(data.data)
                setTags(data.data)
            })
    }

    const setTags = (data: ImageCard[]) => {
        let array: string[] = [];
        data.forEach(info => {
            info.tags.forEach(tag => {
                if (!array.includes(tag)) {
                    array.push(tag);
                }
            })
        })
        setAllTags(array);
    }

    const uploadPicture = (htmlFormElement: HTMLFormElement) => {
        const formData = new FormData(htmlFormElement);
        axios
            .post("/api/uploadPicture", formData)
            .then(data => data.data)
            .then(getAllImageInfos)
            .catch(() => {
                    console.log("Bild konnte nicht gespeichert werden");
                    return [];
                }
            );
    }

    const addTags = (id: string, tags: string[]) => {
        axios.post("/api/addTag/" + id, tags)
            .then(getAllImageInfos);
    }

    return {imageInfos, allTags, uploadPicture, addTags}
}
