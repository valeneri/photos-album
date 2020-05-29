import React, { useState } from "react";
import "./filters.css";
import { YearEvents, Event, Category } from "../../../pages/events/events-page";

interface FiltersProps {
    categories: Category[],
    setSelectedCategory: any
}

const Filters = ({ categories, setSelectedCategory }: FiltersProps) => {

    const handleSelectCategory = (selectedCategory: Category) => {
        const categoriesCopy = categories;
        const index = categoriesCopy.findIndex((category: Category) => category.name === selectedCategory.name);
        categoriesCopy[index].selected = !categoriesCopy[index].selected;

        // if "all" button selected, select/deselect all others
        if (selectedCategory.name === 'total') {
            categoriesCopy.filter((category: Category) => category.value > 0).map(category => category.selected = selectedCategory.selected);
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
                {categories && categories.map((category: Category, index: number) => {
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