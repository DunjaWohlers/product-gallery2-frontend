import {useEffect, useState} from "react";
import {API, Storage} from "aws-amplify";
import {listTodos} from "../graphql/queries";
import {createTodo as createNoteMutation, deleteTodo as deleteNoteMutation} from '../graphql/mutations';
import {ImageInfoType, InitialImageInfo} from "../type/Note";
import {MyGraphQLResult} from "../type/MyGraphQLResult";

export default function usePictures() {

    const [notes, setNotes] = useState<ImageInfoType [] | undefined>([]);

    useEffect(() => {
        fetchNotes().catch(() => console.log("Laden fehlgeschlagen"));
    }, []);

    function imageUpload(file: File) {
        console.log(file);
        Storage.put(file.name, file).then(fetchNotes);
    }

    async function fetchNotes() {
        console.log("Start");

        const apiData = await (API.graphql({query: listTodos})) as MyGraphQLResult;

        console.log(apiData)
        const notesFromAPI: ImageInfoType[] | undefined = apiData.data?.listImageInfos.items;
        console.log(notesFromAPI)
        if (notesFromAPI) {
            Promise.all(
                notesFromAPI
            ).then(result => setNotes(result));
        }
    }

    async function createNote(imageInfo: InitialImageInfo) {
        console.log(imageInfo)
        await API.graphql({query: createNoteMutation, variables: {input: imageInfo}});
        console.log("gespeichert?")
    }

    async function deleteNote(imageInfo: ImageInfoType) {
        const id = imageInfo.id;
        const newNotesArray = notes?.filter(note => note.id !== id);
        setNotes(newNotesArray);
        await API.graphql({query: deleteNoteMutation, variables: {input: {id}}});
        const imageLink = imageInfo.image;
        const imageName = imageLink.split("/public/")[1].split("?")[0];
        await Storage.remove(imageName);
    }

    return {notes, createNote, deleteNote, imageUpload}
}
