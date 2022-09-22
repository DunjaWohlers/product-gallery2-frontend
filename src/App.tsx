import React, {FormEvent} from 'react';
import './App.css';
import axios from "axios";

export default function App() {

    const handleSave = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const htmlFormElement = event.target as HTMLFormElement;
        const formData = new FormData(htmlFormElement);

        return axios.post("/api/uploadPicture", formData,
        ).then(data => data.data)
            .catch(() => {
                    console.log("Bild konnte nicht gespeichert werden");
                    return [];
                }
            );
    }

    return (
        <div className="App">
            <form onSubmit={handleSave}>
                <label> Neues Bild hinzufügen: </label>
                <input type={"file"} name={"file"}/>
                <button type={"submit"}> speichern</button>
            </form>
        </div>
    );
}
