import React, {ChangeEvent, useState} from 'react';
import './App.css';
import PictureGallery from "./component/PictureGallery";
import {Authenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import usePictures from "./api/usePictures";
import {Storage} from "aws-amplify";
import {InitialImageInfo} from "./type/Note";

export default function App() {
    const initialFormState = {name: 'horst', tags: ["a"], image: ""}
    const [formData, setFormData] = useState<InitialImageInfo>(initialFormState);
    const {notes, createNote, deleteNote, imageUpload} = usePictures();
    const [actualNoteInput, setActualNoteInput]  = useState<string>("");

    async function onEditPicture(e: ChangeEvent<HTMLInputElement>) {
        if ((e.target.files && !e.target.files[0] )|| !e.target.files) return
        const file = e.target.files[0];
        console.log(file);
        console.log("imageupload:")
        await imageUpload(e.target.files[0])
        const imageLink = await Storage.get(file.name);
        console.log("edit")
        console.log(file.name);
        console.log(formData);
            console.log(imageLink)
        setFormData({...formData, image: imageLink});
    }

    const handleSaveImageInfo = async () => {
        if (formData && formData.image && formData.tags) {
            await createNote(formData);
            setFormData(initialFormState);
            return
        }
        console.log("Formdata, Image oder Tags nicht vorhanden.")
    }

    const handleChangeTags = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;
        let newTags = formData.tags;
        newTags? newTags.push(inputValue)  : newTags=[inputValue];
        setFormData({...formData, 'tags': newTags});
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
            {/*  <input
                onChange={e => setFormData({...formData, 'name': e.target.value})}
                placeholder="Note name"
                value={formData.name}
            />
            */
            }
            <input
                onChange={handleChangeTags}
                placeholder="Note description"
            />
            <input
                type="file" onChange={onEditPicture}/>
            <button onClick={handleSaveImageInfo}>Create Note
            </button>
            <div style={{marginBottom: 30}}>
                {
                    notes?.map((note) => (
                        <div key={note.id || note.name}>
                            <h2>{note.name}</h2>
                            <p>{[...note.tags]}</p>
                            <button onClick={() => {
                                note.id && deleteNote(note);
                            }}>Delete note
                            </button>
                            {
                                note.image !== "" &&
                                <img src={note.image}
                                     style={{width: 400}}
                                     alt={"Image for the note " + note.name + " could not be loaded."}/>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
