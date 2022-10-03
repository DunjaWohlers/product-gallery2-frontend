import {useEffect, useState} from "react";
import {API} from "aws-amplify";
import {listTodos} from "../graphql/queries";
import {createTodo as createNoteMutation, deleteTodo as deleteNoteMutation} from '../graphql/mutations';
import {InitialNote} from "../type/Note";
import {MyGraphQLResult} from "../type/MyGraphQLResult";

export default function usePictures() {

    const [notes, setNotes] = useState<{ id?: string, name: string, description: string } [] | undefined>([]);

    useEffect(() => {
        fetchNotes();
    }, []);

    async function fetchNotes() {
        const apiData = await API.graphql({query: listTodos}) as MyGraphQLResult;
        setNotes(apiData?.data?.listTodos.items);
    }

    async function createNote(note: InitialNote) {
        if(note.name!==""&&note.description!=="") {
            await API.graphql({query: createNoteMutation, variables: {input: note}});
            notes ? setNotes([...notes, note]) : setNotes([note]);
        }
    }

    async function deleteNote(id: string) {
        const newNotesArray = notes?.filter(note => note.id !== id);
        setNotes(newNotesArray);
        await API.graphql({query: deleteNoteMutation, variables: {input: {id}}});
    }

    return {notes, createNote, deleteNote}
}
