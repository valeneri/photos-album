import React, { useState, useEffect } from "react";
import * as api from "../../../shared/api";
import useCustomForm from "../../../shared/hooks/use-custom-form";
import "./create-event-form.css";
import { Category, CategoryGroup, YearEvents } from "../../../shared/models";


interface CreateEventFormProps {
    year: YearEvents;
    setCreatedYear: any;
    categories: Category[];
}

const initialValues = {
    title: "",
    full_date: "",
    category: "",
    description: "",
    location: "",
    date: "",
};


const CreateEventForm = ({ year, categories, setCreatedYear }: CreateEventFormProps) => {

    // const yearDate = date;
    initialValues.date = year.date ? year.date : '';

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
        onSubmit: (submittedEvent: any) => { addEventFormSubmit(submittedEvent) }
    }
    );

    const addEventFormSubmit = async (submittedEvent: any) => {
        console.log(submittedEvent)
        const { errors, values } = submittedEvent;
        if (Object.keys(errors).length === 0 && values.files) {
            let newYear;
            let newEvent;
            let newPhotos;
            let date;

            const { title, full_date, description, location, files } = values;
            const eventTag = `${title}_${new Date().getTime()}`;

            // category is passed as stringified array value on the dropdown, 1st element is name, 2nd is label
            const category = { name: values.category.split(',')[0], label: values.category.split(',')[1] };

            // if year is created, initialize CategoryGroup
            if (!year.date) {
                const categoryGroup: CategoryGroup[] = [{ category: category, value: 1 }];
                date = values.date;
                newYear = { date, categoryGroup };

                await api.createYear(newYear);
                // setCreatedYear();
            } else {
                date = year.date;
                newYear = year;
                const index = newYear.categoryGroup.findIndex((cat: CategoryGroup) => cat.category.name === category.name);

                if (index !== -1) {
                    newYear.categoryGroup[index].value++
                } else {
                    newYear.categoryGroup.push({ category: category, value: 1 });
                }
                await api.updateYear(newYear);
            }

            newEvent = { title, full_date, category, description, location, date, eventTag };
            newPhotos = { title, date, eventTag, files };

            const responseEvent = await api.createEvent(newEvent);
            const responsePhotos = await api.savePhotosEvent(newPhotos);

            console.log("event saved", responseEvent);
            console.log("photos saved", responsePhotos);
        } else {
            console.log("no photos", values.photos)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {
                    year.date &&
                    <div>
                        <span>Ajouter évènement pour l'année <b style={{ color: 'red' }}>{year.date}</b></span>
                        < hr />
                    </div>
                }
                <div className="add-event-form">
                    <div className="required-fields">
                        <h5>Champs obligatoires</h5>
                        {
                            !year.date &&
                            <div className="form-field">
                                <label>Année de l'évènement : </label>
                                <input type="text" name="date" required onChange={handleChange} />
                            </div>
                        }
                        <div className="form-field">
                            <label>Nom de l'évènement : </label>
                            <input type="text" name="title" required onChange={handleChange} />
                        </div>
                        <div className="form-field">
                            <label>Date de l'évènement (Au format jj-MM-AAAA) : </label>
                            <input type="text" name="full_date" required onChange={handleChange} />
                        </div>
                    </div>
                    <div className="optional-fields">
                        <h5>Champs optionnels</h5>
                        <div className="form-field">
                            <label>Catégorie : </label>
                            <select name="category" onChange={handleChange}>
                                {
                                    categories.map((category: Category) => {
                                        return <option key={category._id} value={[category.name, category.label]}>{category.label}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-field">
                            <label>Lieu : </label>
                            <input type="text" name="location" onChange={handleChange} />
                        </div>

                        <div className="form-field">
                            <label>Description : </label>
                            <input type="textarea" name="description" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-field">
                        <label>Ajouter photos : </label>
                        <input type="file" name="files" required multiple onChange={handleFileUpload} />
                    </div>
                    <input type="submit" value="Créer évènement" className="submit-button" />
                </div>
            </form>
        </div>)
}

export default CreateEventForm;