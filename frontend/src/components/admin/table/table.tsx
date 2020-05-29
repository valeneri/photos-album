import React from "react";
import { YearEvents, Event, Category } from "../../../pages/events/events-page";
import "./table.css";

interface TableProps {
    yearsEvents: YearEvents[],
    handleCreateEvent: any
}

const Table = ({ yearsEvents, handleCreateEvent }: TableProps) => {

    const setEventsCategory = (year: YearEvents): any => {
        // const categories = { birthday: 0, holidays: 0, xmas: 0, abstract: 0, other: 0, untagged: 0 };
        const categories: Category[] = [
            { value: 0, label: "Anniversaires", name: "birthday", selected: false },
            { value: 0, label: "Vacances", name: "holidays", selected: false },
            { value: 0, label: "Noël", name: "xmas", selected: false },
            { value: 0, label: "Abstrait", name: "abstract", selected: false },
            { value: 0, label: "Autre", name: "other", selected: false },
            { value: 0, label: "Non classé", name: "untagged", selected: false },
            { value: 0, label: "Total", name: "total", selected: false }
        ];

        year.events.forEach((event: Event) => {
            switch (event.category) {
                case "birthday":
                    categories[0].value++;
                    break;
                case "holidays":
                    categories[1].value++;
                    break;
                case "xmas":
                    categories[2].value++;
                    break;
                case "abstract":
                    categories[3].value++;
                    break;
                case "other":
                    categories[4].value++
                    break;
                default:
                    categories[5].value++
                    break;
            }
        });
        return categories;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th rowSpan={2}>Années</th>
                    <th colSpan={6}>Nombre d'évènements</th>
                    <th rowSpan={2}>Actions</th>
                </tr>
                <tr>
                    <th>Anniversaires</th>
                    <th>Vacances</th>
                    <th>Noël</th>
                    <th>Abstrait</th>
                    <th>Autre</th>
                    <th>Non classé</th>
                </tr>
            </thead>
            <tbody>

                {yearsEvents && yearsEvents.map((yearEvents: YearEvents) => {
                    const category = setEventsCategory(yearEvents);
                    return (
                        <tr key={yearEvents._id}>
                            <th>{yearEvents.date} ({yearEvents.events.length})</th>
                            <td>
                                <span>{category[0].value}</span>
                            </td>
                            <td>
                                <span>{category[1].value}</span>
                            </td>
                            <td>
                                <span>{category[2].value}</span>
                            </td>
                            <td>
                                <span>{category[3].value}</span>
                            </td>
                            <td>
                                <span>{category[4].value}</span>
                            </td>
                            <td>
                                <span>{category[5].value}</span>
                            </td>
                            <td>
                                <button onClick={() => { handleCreateEvent(yearEvents.date) }}>Ajout </button>
                                <button>Modifier</button>
                                <button>Supprimer</button>
                            </td>
                        </tr>)
                })}
            </tbody>
        </table>
    )
}

export default Table;