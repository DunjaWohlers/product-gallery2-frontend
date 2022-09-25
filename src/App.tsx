import React from 'react';
import './App.css';
import PictureGallery from "./component/PictureGallery";

export default function App() {

    return (
        <div className="App">
            <h1> Bilder-Gallerie </h1>
            <main>
                <PictureGallery/>
            </main>
        </div>
    );
}
