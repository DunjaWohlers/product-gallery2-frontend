import {useEffect, useState} from "react";
import {API, Storage} from "aws-amplify";
import {listImageInfos} from "../graphql/queries.js";
import {
    createImageInfo as createNoteMutation,
    deleteImageInfo as deleteNoteMutation,
    updateImageInfo
} from '../graphql/mutations';
import {ImageInfoType, InitialImageInfo} from "../type/ImageInfoType";
import {MyGraphQLResult} from "../type/MyGraphQLResult";

export default function usePictures() {

    const [imageInfoList, setNotes] = useState<ImageInfoType []>([]);
    const [allTags, setAllTags] = useState<string[]>();

    useEffect(() => {
        fetchNotes().catch(() => console.log("Laden fehlgeschlagen"));
    }, []);

    function imageUpload(file: File) {
        Storage.put(file.name, file).catch(() => console.log("upload fehlgeschlagen"));
    }

    const fetchNotes = async () => {
        const apiData = await (API.graphql({query: listImageInfos})) as MyGraphQLResult;
        const notesFromAPI: ImageInfoType[] | undefined = apiData.data?.listImageInfos.items;
        if (notesFromAPI) {
            Promise.all(notesFromAPI)
                .then(result => {
                    setNotes(result);
                    setTags(result);
                })
        }
    }

    const setTags = (data: ImageInfoType[]) => {
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

    const createImageInfo = async (imageInfo: InitialImageInfo) => {
        await API.graphql({query: createNoteMutation, variables: {input: imageInfo}});
    await fetchNotes();
    }

    const addTags = async (info: ImageInfoType, tags: string[]) => {
        const updateItem: ImageInfoType= {name:info.name, image: info.image, id: info.id, tags: tags};
        console.log(updateItem)
        await API.graphql({query: updateImageInfo, variables: {input: updateItem}})
        await fetchNotes();
    }

    const deleteTag = async (info: ImageInfoType, tagToDelete: string) => {
        const updatedTags = info.tags.filter(tag=>tag!==tagToDelete);
        console.log(updatedTags);
        const updateItem: ImageInfoType= {name:info.name, image: info.image, id: info.id, tags: updatedTags};
        await API.graphql({query: updateImageInfo, variables: {input: updateItem}});
        await fetchNotes();
    }

    const deleteImageInfo = async (imageInfo: ImageInfoType) => {
        const id = imageInfo.id;
        const newNotesArray = imageInfoList?.filter(note => note.id !== id);
        setNotes(newNotesArray);
        await API.graphql({query: deleteNoteMutation, variables: {input: {id}}});
        const imageLink = imageInfo.image;
        const imageName = imageLink.split("/public/")[1].split("?")[0];
        await Storage.remove(imageName);
    }

    return {imageInfoList, allTags, createImageInfo, addTags, deleteImageInfo, imageUpload, deleteTag}
}
