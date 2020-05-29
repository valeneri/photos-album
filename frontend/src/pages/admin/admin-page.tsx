import React, { useEffect, useState } from "react";
import * as api from "../../api/api";
import CreateEventForm from "../../components/admin/create-event-form/create-event-form";
import Table from "../../components/admin/table/table";
import { YearEvents } from "../events/events-page";
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

    const createEvent = (date: string) => {
        setEventYear(date);
    }

    return (
        <div className="admin">
            <div className="table-component">
                <Table yearsEvents={yearsEvents} handleCreateEvent={createEvent} />
            </div>
            <hr />
            <div className="full-form">
                <div className="create-event-form">
                    {eventYear && eventYear !== "" && <CreateEventForm date={eventYear} />}
                </div>
            </div>
        </div>

    );
}

export default AdminPage;