import React, { useEffect, useState } from "react";
import * as api from "../../shared/api";
import CreateEventForm from "../../components/admin/create-event-form/create-event-form";
import Table from "../../components/admin/table/table";
import { YearEvents, Category } from "../../shared/models";
import "./admin-page.css";

const AdminPage = () => {

    const [yearsEvents, setYearsEvents] = useState<YearEvents[]>([]);
    const [eventYear, setEventYear] = useState<YearEvents>();
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const getAllYearsEventsAndCategories = async () => {
            const yearResponse = await api.getAllYearsEvents();
            const categoriesResponse = await api.getAllCategories();
            setYearsEvents(yearResponse.data);
            setCategories(categoriesResponse.data);
        }
        getAllYearsEventsAndCategories();
    }, []);

    const handleAddEvent = (year: YearEvents) => {
        setEventYear(year);
    }

    const createNewYearEvent = () => {
        const newYear = {} as YearEvents;
        setEventYear(newYear);
    }

    const handleCreatedYear = async () => {
        const response = await api.getAllYearsEvents();
        setYearsEvents(response.data);
    }

    return (
        <div className="admin">
            <div className="table-component">
                <Table yearsEvents={yearsEvents} categories={categories} addEvent={handleAddEvent} />
            </div>
            <hr />
            <button onClick={() => createNewYearEvent()}>Créér nouvel évènement</button>
            {eventYear &&
                <div className="full-form">
                    <div className="create-event-form">
                        <CreateEventForm year={eventYear} categories={categories} setCreatedYear={handleCreatedYear} />
                    </div>
                </div>
            }
        </div>

    );
}

export default AdminPage;