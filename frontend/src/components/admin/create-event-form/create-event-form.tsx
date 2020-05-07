import React from "react";
import useCustomForm from "../../../hooks/custom-form-hook";
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
    date: ""
};


const CreateEventForm = ({ date }: CreateEventFormProps) => {

    // const yearDate = date;
    initialValues.date = date;

    const {
        values,
        errors,
        touched,
        handleChange,
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
        if (Object.keys(errors).length === 0) {
            const data = await api.createEvent(values);
            console.log(`EVENT SAVED: ${data}`);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <span>Ajouter évènement pour l'année <b style={{ color: 'red' }}>{date}</b></span>
                </div>
                < hr />
                <div className="add-event-form">
                    <label>
                        Nom de l'évènement :
                                {/* <input type="text" name="title" required onChange={handleChange} value={values.title} /> */}
                        <input type="text" name="title" required onChange={handleChange} />
                    </label>
                    <label>
                        Date de l'évènement :
                                {/* <input type="text" name="full_date" required onChange={handleChange} value={values.full_date} /> */}
                        <input type="text" name="full_date" required onChange={handleChange} />
                    </label>
                    <label>
                        Catégorie (optionnel) :
                                {/* <input type="text" name="category" onChange={handleChange} value={values.category} /> */}
                        <input type="text" name="category" onChange={handleChange} />
                    </label>
                    <label>
                        Lieu (optionnel) :
                                {/* <input type="text" name="location" onChange={handleChange} value={values.location} /> */}
                        <input type="text" name="location" onChange={handleChange} />
                    </label>
                    <label>
                        Description (optionnel) :
                                {/* <input type="textarea" name="description" onChange={handleChange} value={values.description} /> */}
                        <input type="textarea" name="description" onChange={handleChange} />
                    </label>
                    <input type="submit" value="Créer" className="submit-button" />
                </div>

            </form>
        </div>)
}

export default CreateEventForm;