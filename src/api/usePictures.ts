import {useEffect, useState} from "react";
import {API, Storage} from "aws-amplify";
import {listTodos} from "../graphql/queries";
import {createTodo as createNoteMutation, deleteTodo as deleteNoteMutation} from '../graphql/mutations';
import {InitialNote, Note} from "../type/Note";
import {MyGraphQLResult} from "../type/MyGraphQLResult";

export default function usePictures() {

    const [notes, setNotes] = useState<Note [] | undefined>([]);

    useEffect(() => {
        fetchNotes();
    }, []);

    async function imageUpload(file: File) {
        await Storage.put(file.name, file);
        fetchNotes();
    }

    async function fetchNotes() {
        const apiData = await API.graphql({query: listTodos}) as MyGraphQLResult;
        const notesFromAPI: Note[] | undefined = apiData.data?.listTodos.items;

        if (notesFromAPI) {
            Promise.all(
                notesFromAPI
            ).then(result => setNotes(result));
        }
    }

    async function createNote(note: InitialNote) {
        await API.graphql({query: createNoteMutation, variables: {input: note}});
    }

    async function deleteNote(note: Note) {
        const id=note.id;
        const newNotesArray = notes?.filter(note => note.id !== id);
        setNotes(newNotesArray);
        await API.graphql({query: deleteNoteMutation, variables: {input: {id}}});
        const imageLink = note.image;
        const imageName = imageLink.split("/public/")[1].split("?")[0];
        Storage.remove(imageName);
    }

    return {notes, createNote, deleteNote, imageUpload}
}
