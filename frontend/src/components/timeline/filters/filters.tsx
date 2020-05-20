import React, { useState } from "react";
import "./filters.css";
import { YearEvents, Event } from "../../../pages/events/events-page";

interface FiltersProps {
    categories: any[],
    setSelectedCategory: any
}

const Filters = ({ categories, setSelectedCategory }: FiltersProps) => {

    const handleSelectCategory = (category: any) => {
        const categoriesCopy = categories;
        const index = categoriesCopy.findIndex((cat: any) => cat.name === category.name);
        categoriesCopy[index].selected = !categoriesCopy[index].selected;

        // if "all" button selected, select/deselect all others
        if (category.name === 'total') {
            categoriesCopy.filter((cat: any) => cat.value > 0).map(cat => cat.selected = category.selected);
        }
        setSelectedCategory(categoriesCopy)
    }

    return (
        <div className="categories-wrapper">
            {categories[6] && categories[6].value > 0 &&
                <div className={`all-categories ${categories[6].selected ? 'selected' : ''}`} onClick={() => handleSelectCategory(categories[6])}>
                    <span>Toutes ({categories[6].value})</span>
                </div>}
            <div className="categories-details">
                {categories && categories.map((category: any, index: number) => {
                    if (category.name !== "total" && category.value > 0) {
                        return (
                            <div key={index} className={`category ${category.selected ? 'selected' : ''}`} onClick={() => handleSelectCategory(category)}>
                                <span>{category.label} ({category.value})</span>
                            </div>
                        )
                    }
                })
                }
            </div>
        </div>
    )
}

export default Filters;