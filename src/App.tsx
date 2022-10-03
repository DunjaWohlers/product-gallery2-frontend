import React, {useState} from 'react';
import './App.css';
import PictureGallery from "./component/PictureGallery";
import {Authenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import usePictures from "./api/usePictures";


export default function App() {
    const initialFormState = {name: '', description: ''}
    const [formData, setFormData] = useState(initialFormState);
    const {notes, createNote, deleteNote} = usePictures();

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
            <button onClick={() => {
                createNote(formData);
                setFormData(initialFormState);
            }}>Create Note
            </button>
            <div style={{marginBottom: 30}}>
                {
                    notes?.map(note => (
                        <div key={note.id || note.name}>
                            <h2>{note.name}</h2>
                            <p>{note.description}</p>
                            <button onClick={() => {
                                note.id && deleteNote(note.id);
                            }}>Delete note
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
