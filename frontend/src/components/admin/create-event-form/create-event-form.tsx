import React from "react";
import useCustomForm from "../../../hooks/use-custom-form";
import * as api from "../../../api/api";

import "./create-event-form.css";

interface CreateEventFormProps {
    date: string
}

const initialValues = {
    title: "",
    full_date: "",
    category: "untagged",
    description: "",
    location: "",
    date: "",
};


const CreateEventForm = ({ date }: CreateEventFormProps) => {

    // const yearDate = date;
    initialValues.date = date;

    const {
        values,
        errors,
        touched,
        handleChange,
        handleFileUpload,
        handleBlur,
        handleSubmit
    } = useCustomForm({
        initialValues,
        onSubmit: (submittedEvent: any) => { submitForm(submittedEvent) }
    }
    );

    const submitForm = async (submittedEvent: any) => {
        console.log(submittedEvent)
        const { errors, values } = submittedEvent;
        if (Object.keys(errors).length === 0 && values.photo) {
            const { title, full_date, category, description, location, files, photo } = values;
            const eventTag = `${title}_${full_date}`;

            const event = { title, full_date, category, description, location, date, eventTag };
            const photos: any = { title, date, eventTag, files };

            const responseEvent = await api.createEvent(event);
            const responsePhotos = await api.savePhotosEvent(photos);

            console.log("event saved", responseEvent);
            console.log("photos saved", responsePhotos);
        } else {
            console.log("no photos", values.photos)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <span>Ajouter évènement pour l'année <b style={{ color: 'red' }}>{date}</b></span>
                </div>
                < hr />
                <div className="add-event-form">
                    <div className="required-fields">
                        <h5>Champs obligatoires</h5>
                        <label>
                            Nom de l'évènement :
                        <input type="text" name="title" required onChange={handleChange} />
                        </label>
                        <label>
                            Date de l'évènement :
                        <input type="text" name="full_date" required onChange={handleChange} />
                        </label>
                    </div>

                    <div className="optional-fields">
                        <h5>Champs optionnels</h5>
                        <label>
                            Catégorie :
                        <input type="text" name="category" onChange={handleChange} />
                        </label>
                        <label>
                            Lieu :
                        <input type="text" name="location" onChange={handleChange} />
                        </label>
                        <label>
                            Description :
                        <input type="textarea" name="description" onChange={handleChange} />
                        </label>
                    </div>
                    <label>
                        Ajouter photos :
                        <input type="file" name="files" required multiple onChange={handleFileUpload} />
                    </label>
                    <input type="submit" value="Créer évènement" className="submit-button" />
                </div>
            </form>
        </div>)
}

export default CreateEventForm;