import React from 'react';
import './App.css';
import PictureGallery from "./component/PictureGallery";
import {Authenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';


export default function App() {

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
        </div>
    );
}
