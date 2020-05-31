import React from "react";
import { Category } from "../../../pages/events/events-page";
import "./filters.css";

interface FiltersProps {
    categories: Category[],
    setSelectedCategory: any
}

const Filters = ({ categories, setSelectedCategory }: FiltersProps) => {

    return (
        <div className="categories-wrapper">
            {categories[6] && categories[6].value > 0 &&
                <div className={`all-categories ${categories[6].selected ? 'selected' : ''}`} onClick={() => setSelectedCategory(categories[6])}>
                    <span>Toutes ({categories[6].value})</span>
                </div>}
            <div className="categories-details">
                {categories && categories.map((category: Category, index: number) => {
                    if (category.name !== "total" && category.value > 0) {
                        return (
                            <div key={index} className={`category ${category.selected ? 'selected' : ''}`} onClick={() => setSelectedCategory(category)}>
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