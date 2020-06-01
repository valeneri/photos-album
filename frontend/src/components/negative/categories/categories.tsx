import React from "react";
import { Category } from "../../../pages/events/events-page";
import "./categories.css";

interface FiltersProps {
    categories: Category[];
    setSelectedCategory: any;
}

const Categories = ({ categories, setSelectedCategory }: FiltersProps) => {

    return (
        <div className="categories-wrapper">
            {
                <div className="categories-details">
                    {categories && categories.map((category: Category, index: number) => {
                        return (
                            category.value > 0 &&
                            <div
                                key={index}
                                className={`category ${category.selected ? 'selected' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                <span>{category.label} ({category.value})</span>
                            </div>
                        )
                    })
                    }
                </div>
            }
        </div>
    )
}

export default Categories;