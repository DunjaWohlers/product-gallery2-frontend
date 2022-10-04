import React, {ChangeEvent, useState} from 'react';
import './App.css';
import PictureGallery from "./component/PictureGallery";
import {Authenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import usePictures from "./api/usePictures";
import {InitialNote} from "./type/Note";
import {Storage} from "aws-amplify";

export default function App() {
    const initialFormState = {name: '', description: '', image: ""}
    const [formData, setFormData] = useState<InitialNote>(initialFormState);
    const {notes, createNote, deleteNote, imageUpload} = usePictures();

    async function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && !e.target.files[0] || !e.target.files) return
        const file = e.target.files[0];
        await imageUpload(e.target.files[0])
        const imageLink = await Storage.get(file.name);
        setFormData({...formData, image: imageLink});
    }

    const handleCreateNote = async () => {
        if (formData.name !== "" && formData.description !== "") {
            createNote(formData);
            setFormData(initialFormState);
        }
    }

    return (
        <div className="App">
            <Authenticator>
                {({signOut, user}) => (
                    <p>
                        Hey {user?.username}, welcome to my channel, with auth!
                        <button onClick={signOut}>Sign out</button>
                    </p>
                )}
            </Authenticator>
            <h1> Bilder-Gallerie </h1>
            <main>
                <PictureGallery/>
            </main>

            <h1>My Notes App</h1>
            <input
                onChange={e => setFormData({...formData, 'name': e.target.value})}
                placeholder="Note name"
                value={formData.name}
            />
            <input
                onChange={e => setFormData({...formData, 'description': e.target.value})}
                placeholder="Note description"
                value={formData.description}
            />
            <input
                type="file" onChange={onChangeHandler}/>
            <button onClick={handleCreateNote}>Create Note
            </button>
            <div style={{marginBottom: 30}}>
                {
                    notes?.map((note) => (
                        <div key={note.id || note.name}>
                            <h2>{note.name}</h2>
                            <p>{note.description}</p>
                            <button onClick={() => {
                                note.id && deleteNote(note);
                            }}>Delete note
                            </button>
                            {
                               note.image !== "" &&
                               <img src={note.image}
                                    style={{width: 400}} alt={"Image for the note " + note.name + " could not be loaded."}/>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
