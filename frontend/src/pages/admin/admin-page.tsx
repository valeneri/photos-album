import React, { useEffect, useState } from "react";
import * as api from "../../shared/api";
import CreateEventForm from "../../components/admin/create-event-form/create-event-form";
import Table from "../../components/admin/table/table";
import { YearEvents } from "../../shared/models";
import "./admin-page.css";

const AdminPage = () => {

    const [yearsEvents, setYearsEvents] = useState<YearEvents[]>([]);
    const [eventYear, setEventYear] = useState<string>("");

    useEffect(() => {
        const getAllYearsEvents = async () => {
            const response = await api.getAllYearsEvents();
            setYearsEvents(response.data);
        }
        getAllYearsEvents();
    }, []);

    const addEvent = (date: string) => {
        setEventYear(date);
    }

    const handleCreatedYear = async () => {
        const response = await api.getAllYearsEvents();
        setYearsEvents(response.data);
    }

    return (
        <div className="admin">
            <button onClick={() => setEventYear('new')}>Créér nouvel évènement</button>
            <div className="table-component">
                {/* <Table yearsEvents={yearsEvents} handleAddEvent={addEvent} /> */}
            </div>
            <hr />
            <div className="full-form">
                <div className="create-event-form">
                    {eventYear && eventYear !== "" && <CreateEventForm year={eventYear} setCreatedYear={handleCreatedYear} />}
                </div>
            </div>
        </div>

    );
}

export default AdminPage;