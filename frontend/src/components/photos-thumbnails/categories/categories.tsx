import React, { useState } from "react";
import { Category, CategoryGroup } from "../../../shared/models";
import "./categories.css";

interface FiltersProps {
    yearCategoriesGroup: CategoryGroup[];
    fullCategoriesList: Category[];
    setSelectedCategories: any;
}

const Categories = ({ yearCategoriesGroup, fullCategoriesList, setSelectedCategories }: FiltersProps) => {

    // set year categories
    const [categoriesGroup, setCategoriesGroup] = useState<CategoryGroup[]>(yearCategoriesGroup);

    // set selected category
    // performs autoselect if necessary
    // send categoriesGroup to parent in order to filter displayed events
    const handleSelectedCategories = (catGroup: CategoryGroup) => {
        let categoriesGroupCopy = [...categoriesGroup];
        const index = categoriesGroupCopy.findIndex((cat: CategoryGroup) => cat.category.name === catGroup.category.name);
        categoriesGroupCopy[index].selected = !categoriesGroupCopy[index].selected;

        // if "total" button selected, select all others
        // else if "total" button unselected, unselect all others
        // else if all others selected/unselected, select/unselected "all" button
        if (catGroup.category.name === 'total' && catGroup.selected) {
            categoriesGroupCopy.map((cat: CategoryGroup) => cat.selected = true);
        } else if (catGroup.category.name === 'total' && !catGroup.selected) {
            categoriesGroupCopy.map((cat: CategoryGroup) => cat.selected = false);
        } else {
            const categoriesWithoutTotal = categoriesGroupCopy.slice(1);
            const isAllCategoriesSelected = categoriesWithoutTotal.every((cat: CategoryGroup) => cat.selected);

            // refers to 'total' category
            isAllCategoriesSelected ? categoriesGroupCopy[0].selected = true : categoriesGroupCopy[0].selected = false;
        }
        setCategoriesGroup(categoriesGroupCopy);
    }

    // display icons from categories list if category isn't 'total'
    const displayCategoryIcon = (catGroup: CategoryGroup) => {
        if (catGroup.category.name === 'total') {
            return (
                <div>
                    <span>{catGroup.category.label}</span>
                </div>
            )
        } else {
            const cat = fullCategoriesList.filter((cat: Category) => {
                return catGroup.category.name === cat.name;
            })
            return (
                <img src={`data:image/jpeg;base64,${cat[0].icon.file}`} />
            )
        }
    }

    return (
        <div className="categories-wrapper">
            {
                <div className="categories-details">
                    {
                        categoriesGroup &&
                        fullCategoriesList &&
                        categoriesGroup.map((catGroup: CategoryGroup, index: number) => {
                            return (
                                catGroup.value > 0 &&
                                <div
                                    key={index}
                                    className={catGroup.selected ? 'category selected' : 'category'}
                                    onClick={() => handleSelectedCategories(catGroup)}
                                >
                                    {displayCategoryIcon(catGroup)}
                                    <span><b>{catGroup.value}</b></span>
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