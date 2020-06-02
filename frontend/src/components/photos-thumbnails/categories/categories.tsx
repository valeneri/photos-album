import React from "react";
import { Category, CategoryGroup } from "../../../shared/models";
import birthday from "./icons/birthday_icon.png";
import nature from "./icons/nature_icon.png";
import untagged from "./icons/untagged_icon.png";
import holidays from "./icons/holidays_icon.png";
import xmas from "./icons/xmas_icon.png";
import "./categories.css";

interface FiltersProps {
    categories: CategoryGroup[];
    setSelectedCategory: any;
}

const Categories = ({ categories, setSelectedCategory }: FiltersProps) => {

    const displayIcon = (category: Category) => {
        switch (category.name) {
            case 'birthday':
                return (<img src={birthday} ></img>)
            case 'nature':
                return (<img src={nature} ></img>)
            case 'untagged':
                return (<img src={untagged} ></img>)
            case 'holidays':
                return (<img src={holidays} ></img>)
            case 'xmas':
                return (<img src={xmas} ></img>)
            case 'total':
                return (
                    <div >
                        <span >Tous</span>
                    </div>
                )
            default:
                break;
        }
    }

    return (
        <div className="categories-wrapper">
            {
                <div className="categories-details">
                    {categories && categories.map((category: CategoryGroup, index: number) => {
                        return (
                            category.value > 0 &&
                            <div
                                key={index}
                                className={category.selected ? 'category selected' : 'category'}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {/* <span>{category.label} ({category.value})</span> */}
                                {displayIcon(category.type)}
                                <span><b>{category.value}</b></span>
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