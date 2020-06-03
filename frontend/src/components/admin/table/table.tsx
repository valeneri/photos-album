import React, { useState } from "react";
import { YearEvents, Event, Category, CategoryGroup } from "../../../shared/models";
import "./table.css";

interface TableProps {
    yearsEvents: YearEvents[],
    handleAddEvent: any
}

const Table = ({ yearsEvents, handleAddEvent }: TableProps) => {

    const setAllYearsCategoryGroup = (years: YearEvents[]): YearEvents[] => {
        return years.map((year: YearEvents) => {
            const categoryGroup = setEventsCategoryGroup(year);
            year["categoryGroup"] = categoryGroup;
            return year;
        })
    };

    const setEventsCategoryGroup = (year: YearEvents): CategoryGroup[] => {
        const total: CategoryGroup = { category: { name: 'total', label: 'Toutes' }, value: 0, selected: false };
        let categories: CategoryGroup[] = [total];

        year.events.forEach((event: Event) => {
            const index = categories.findIndex((cat: CategoryGroup) => cat.category.name === event.category.name);
            if (index !== -1) {
                categories[index].value++;
            } else {
                const eventCategory: CategoryGroup = { category: event.category, selected: false, value: 1 };
                categories.push(eventCategory);
            }
            //total is the first element
            categories[0].value++;
        });
        return categories;
    };

    const [yearsEventWithCategories, setYearsEventWithCategories] = useState<YearEvents[]>(setAllYearsCategoryGroup(yearsEvents))

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
            {/* <tbody>

                {yearsEventWithCategories && yearsEventWithCategories.map((yearEvents: YearEvents) => {
                    const categoryGroup = yearEvents.categoryGroup;
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
                                <button onClick={() => { handleAddEvent(yearEvents.date) }}>Ajout </button>
                                <button>Modifier</button>
                                <button>Supprimer</button>
                            </td>
                        </tr>)
                })}
            </tbody> */}
        </table>
    )
}

export default Table;