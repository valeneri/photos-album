import React, { useState } from "react";
import * as api from "../../shared/api";
import { Category, CategoryGroup, Event, YearEvents } from "../../shared/models";
import { textDate } from '../../shared/utils';
import Categories from "./categories/categories";
import DisplayPhotosThumbnails from "./display-photos-thumbnails/display-photos-thumbnails";
import "./photos-thumbnails.css";

interface PhotosThumbnailsProps {
    selectedYear: YearEvents;
    setSelectedEvent: any;
    setSelectedPhoto: any;
}

const PhotosThumbnails = ({ selectedYear, setSelectedEvent, setSelectedPhoto }: PhotosThumbnailsProps) => {
    // initialize categories
    // const initCategories: Category[] = [
    //     { value: 0, label: "Total", name: "total", selected: true },
    //     { value: 0, label: "Anniversaires", name: "birthday", selected: true },
    //     { value: 0, label: "Vacances", name: "holidays", selected: true },
    //     { value: 0, label: "Noël", name: "xmas", selected: true },
    //     { value: 0, label: "Nature", name: "nature", selected: true },
    //     // { value: 0, label: "Autre", name: "other", selected: true },
    //     { value: 0, label: "Non classé", name: "untagged", selected: true },
    // ];

    // count then group year events categories
    const groupCategories = (year: YearEvents): CategoryGroup[] => {
        const total: CategoryGroup = { category: { name: 'total', label: 'Toutes' }, value: 0, selected: true };
        let categories: CategoryGroup[] = [total];

        year.events.forEach((event: Event) => {
            const index = categories.findIndex((catGroup: CategoryGroup) => catGroup.category.name === event.category.name);
            if (index !== -1) {
                categories[index].value++;
            } else {
                const eventCategory: CategoryGroup = { category: event.category, selected: true, value: 1 };
                categories.push(eventCategory);
            }
            //total is the first element
            categories[0].value++;
        });
        return categories;
    }

    // set events categories
    const [categoriesGroup, setCategoriesGroup] = useState<CategoryGroup[]>(groupCategories(selectedYear));
    // events list
    const [events, setEvents] = useState<Event[]>(selectedYear.events);

    // handle categories on select, then filter events 
    const handleSelectCategory = (categoryGroup: CategoryGroup) => {
        const categoriesCopy = [...categoriesGroup];

        categoryGroup.selected = !categoryGroup.selected;

        if (categoryGroup.category.name === 'total' && categoryGroup.selected) {
            categoriesCopy.map((cat: CategoryGroup) => cat.selected = true);
            setCategoriesGroup(categoriesCopy);
        } else if (categoryGroup.category.name === 'total' && !categoryGroup.selected) {
            categoriesCopy.map((cat: CategoryGroup) => cat.selected = false);
            setCategoriesGroup(categoriesCopy);
        } else {
            const index = categoriesCopy.findIndex((catGroup: CategoryGroup) => catGroup.category.name === categoryGroup.category.name);
            categoriesCopy[index] = categoryGroup;
            autoSelectAllCategories(categoriesCopy);
        }
    }

    // autoselect or not "total" category
    const autoSelectAllCategories = (categories: CategoryGroup[]) => {
        const categoriesWithoutTotal = categories.filter((catGroup: CategoryGroup) => { return (catGroup.value > 0 && catGroup.category.name !== 'total') });

        // if "all" button selected, select all others
        // else if all others selected, select "all" button
        // else deselect "all" button
        if (categoriesWithoutTotal.every((category: CategoryGroup) => category.selected)) {
            categories[0].selected = true;
        } else {
            categories[0].selected = false;
        }
        setCategoriesGroup(categories);
    }

    // display selected event photos, or "click me" if no event is selected
    const displayPhotos = (event: Event) => {
        return (
            <div key={event._id} style={{ display: (event.selected ? 'block' : 'none') }}>
                <DisplayPhotosThumbnails selectedEvent={event} setSelectedPhoto={setSelectedPhoto} />
            </div>
        )
    }

    // get selected event photos if there aren't any already, then toggle selected flag
    const handleSelectedEvent = async (event: Event) => {
        const copyEvents = [...events];

        if (!event.photos) {
            const tag = event.eventTag;
            const response = await api.getPhotosByEventTag(tag);
            event["photos"] = response.data;
        }

        copyEvents.forEach((evt: Event) => {
            if (evt._id === event._id) {
                evt = event;
                evt.selected = !evt.selected;
            } else {
                evt.selected = false
            }
        })

        setSelectedEvent(event);
        setEvents(copyEvents);
    }

    // check if there's event in year in order to display them
    const isEventCategorySelected = (event: Event) => {
        const selectedCategories = categoriesGroup.filter(cat => cat.selected);
        // const events = selectedYear.events.filter((event: Event) => {
        if (selectedCategories.find((categoryGroup: CategoryGroup) => categoryGroup.category.name === event.category.name)) {
            return true;
        }
        // })
        // return events.length > 0 ? true : false;
    }

    // display events in a tab
    const displayEventsTab = () => {
        // const selectedCategories = categories.filter((category: CategoryGroup) => category.selected);
        const events: Event[] = selectedYear.events;

        return events.map((event: Event) => {
            if (isEventCategorySelected(event)) {
                return (
                    <div key={`${event._id}`} className={`event-tab-details ${event.selected ? 'selected' : null}`} onClick={() => handleSelectedEvent(event)}>
                        <span className="title"><b>{event.title}</b></span>
                        <span>
                            {textDate(event.full_date)}
                            <small> ({event.photosNumber} photos)</small>
                        </span>
                    </div>
                )
                // display also untagged events
                // } else if (categories[5].selected && categories.every((cat: Category) => cat.name !== event.category)) {
                //     return (
                //         <div key={`${event._id}`} className={`event-tab-details ${event.selected ? "selected" : null}`} onClick={() => handleSelectedEvent(event)}>
                //             <span className="title"><b>{event.title}</b></span>
                //             <span>
                //                 {textDate(event.full_date)}
                //                 <small> ({event.photosNumber} photos)</small>
                //             </span>
                //         </div>
                //     )
                // 
            }
        })
    }

    return (
        <div className="full-year-wrapper">
            <div className="year-header">
                <div className="year-details">
                    <h2>Année {selectedYear.date}</h2>
                </div>
                <div className="categories-component">
                    <Categories categories={categoriesGroup} setSelectedCategory={handleSelectCategory} />
                </div>
            </div>
            {
                // checkEvents() ?
                <div>
                    <div className="events-tab-wrapper">
                        {displayEventsTab()}
                    </div>
                    <div className="thumbnails-wrapper">
                        {
                            events.filter(evt => { return evt.selected }).length > 0 ?
                                events.map((event: Event) => {
                                    if (event.photos) {
                                        return displayPhotos(event)
                                    }
                                })
                                : <h3 style={{ textAlign: `left` }}>Cliquez sur un évènement pour afficher les photos</h3>
                        }
                    </div>
                </div>
                // :
                // <div style={{ marginLeft: `2%` }}>
                //     <h3>Aucun évènement</h3>
                // </div>
            }
        </div>
    )
}
export default PhotosThumbnails;