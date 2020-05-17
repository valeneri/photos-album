import React from "react";
import { YearEvents, Event } from "../../../pages/events/events-page";
import "./table.css";

interface TableProps {
    yearsEvents: YearEvents[],
    handleCreateEvent: any
}

const Table = ({ yearsEvents, handleCreateEvent }: TableProps) => {

    const setEventsCategory = (year: YearEvents): any => {
        const categories = { birthday: 0, holidays: 0, xmas: 0, abstract: 0, other: 0, untagged: 0 };

        year.events.forEach((event: Event) => {
            switch (event.category) {
                case "birthday":
                    categories.birthday++;
                    break;
                case "holidays":
                    categories.holidays++;
                    break;
                case "xmas":
                    categories.xmas++;
                    break;
                case "abstract":
                    categories.abstract++;
                    break;
                case "other":
                    categories.other++
                    break;
                default:
                    categories.untagged++
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
                                <span>{category.birthday}</span>
                            </td>
                            <td>
                                <span>{category.holidays}</span>
                            </td>
                            <td>
                                <span>{category.xmas}</span>
                            </td>
                            <td>
                                <span>{category.abstract}</span>
                            </td>
                            <td>
                                <span>{category.other}</span>
                            </td>
                            <td>
                                <span>{category.untagged}</span>
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