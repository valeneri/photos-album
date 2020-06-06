import React, { useState } from "react";
import { YearEvents, Event, Category, CategoryGroup } from "../../../shared/models";
import "./table.css";

interface TableProps {
    yearsEvents: YearEvents[];
    categories: Category[];
    addEvent: any;
}

const Table = ({ yearsEvents, categories, addEvent }: TableProps) => {

    const setCategoriesValue = (categoryGroup: CategoryGroup[]) => {

        return categories.map((cat: Category) => {
            let value = 0;
            categoryGroup.forEach((catGroup: CategoryGroup) => {
                if (cat.name === catGroup.category.name) {
                    value = catGroup.value;
                }
            })
            return (
                <td key={cat._id}>
                    <span>{value}</span>
                </td>
            )
        })
    }

    return (
        <table>
            <thead>
                <tr>
                    <th rowSpan={2}>Années</th>
                    <th colSpan={categories.length}>Nombre d'évènements</th>
                    <th rowSpan={2}>Actions</th>
                </tr>
                <tr>
                    {
                        categories && categories.map((category: Category) => {
                            return <th key={category._id}>{category.label}</th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    yearsEvents && yearsEvents.map((yearEvents: YearEvents) => {
                        if (yearEvents.categoryGroup) {
                            return (
                                <tr key={yearEvents._id}>
                                    <th>{yearEvents.date} ({yearEvents.events.length})</th>

                                    {setCategoriesValue(yearEvents.categoryGroup)}

                                    <td>
                                        <button onClick={() => { addEvent(yearEvents) }}>Ajout Evènement</button>
                                        <button>Modifier</button>
                                        <button>Supprimer</button>
                                    </td>
                                </tr>
                            )
                        }
                    })
                }
            </tbody>
        </table>
    )
}

export default Table;