import React, { useState, useEffect } from "react";
import { Event, YearEvents, Category } from "../../pages/events/events-page";
import DisplayPhotosThumbnails from "./display-photos-thumbnails/display-photos-thumbnails";
import * as api from "../../api/api";
import { textDate } from '../../utils/utils';
import "./photos-thumbnails.css";
import Filters from "../timeline/filters/filters";

interface PhotosThumbnailsProps {
    selectedYear: YearEvents,
    setSelectedEvent: any,
    setSelectedPhoto: any,
}

const PhotosThumbnails = ({ selectedYear, setSelectedEvent, setSelectedPhoto }: PhotosThumbnailsProps) => {
    const initCategories: Category[] = [
        { value: 0, label: "Anniversaires", name: "birthday", selected: false },
        { value: 0, label: "Vacances", name: "holidays", selected: false },
        { value: 0, label: "Noël", name: "xmas", selected: false },
        { value: 0, label: "Abstrait", name: "abstract", selected: false },
        { value: 0, label: "Autre", name: "other", selected: false },
        { value: 0, label: "Non classé", name: "untagged", selected: false },
        { value: 0, label: "Total", name: "total", selected: false }
    ];

    // count year events categories
    const countCategories = (year: YearEvents): Category[] => {
        year.events.forEach((event: Event) => {
            switch (event.category) {
                case "birthday":
                    initCategories[0].value++;
                    break;
                case "holidays":
                    initCategories[1].value++;
                    break;
                case "xmas":
                    initCategories[2].value++;
                    break;
                case "abstract":
                    initCategories[3].value++;
                    break;
                case "other":
                    initCategories[4].value++;
                    break;
                default:
                    initCategories[5].value++;
                    break;
            }
        });
        let sum = 0;
        for (let i = 0; i < initCategories.length - 1; i++) {
            sum += initCategories[i].value;
        }
        initCategories[6].value = sum;
        return initCategories;
    }

    // set events categories
    const [categories, setCategories] = useState<Category[]>(countCategories(selectedYear));

    const [orderedEvents, setOrderedEvents] = useState<Event[]>(selectedYear.events);

    // handle categories on select, then filter events 
    const handleSelectCategory = (category: Category) => {
        const categoriesCopy = [...categories];

        category.selected = !category.selected;

        if (category.name === 'total' && category.selected) {
            categoriesCopy.map((cat: Category) => cat.selected = true);
            setCategories(categoriesCopy);
        } else if (category.name === 'total' && !category.selected) {
            categoriesCopy.map((cat: Category) => cat.selected = false);
            setCategories(categoriesCopy);
        } else {
            const index = categoriesCopy.findIndex((cat: Category) => cat.name === category.name);
            categoriesCopy[index] = category;
            autoSelectAllCategories(categoriesCopy);
        }
    }

    // autoselect or not "total" category
    const autoSelectAllCategories = (categories: Category[]) => {
        const categoriesWithoutTotal = categories.slice(0, 6).filter((cat: any) => cat.value > 0);

        // if "all" button selected, select all others
        // else if all others selected, select "all" button
        // else deselect "all" button
        if (categoriesWithoutTotal.every((category: any) => category.selected)) {
            categories[6].selected = true;
        } else {
            categories[6].selected = false;
        }
        setCategories(categories);
    }

    // display selected event photos, or "click me" if no event is selected
    const displayPhotos = (event: Event, isShowed: boolean) => {
        return (<div key={event._id} style={{ display: (isShowed && event.selected ? 'block' : 'none') }}>
            <DisplayPhotosThumbnails selectedEvent={event} setSelectedPhoto={setSelectedPhoto} />
        </div>)
    }

    // get selected event photos if there aren't any already, then toggle selected flag
    const handleSelectedEvent = async (event: Event) => {
        if (!event.photos) {
            const tag = `${event.title}_${event.full_date}`;
            const response = await api.getPhotosByEvent(tag);
            event["photos"] = response.data;
        }
        event.selected = !event.selected;
        setSelectedEvent(event);
        setEventsOrder(event);
    }

    /* set display events order.
        if selected event already in events list, remove it then push it at first position
        else if selected event not in list, push it directly at first position
        else events list is empty, just push it 
    */
    const setEventsOrder = (event: Event) => {
        let copyEvents = [...orderedEvents];
        copyEvents = copyEvents.filter((evt: Event) => evt._id !== event._id);
        copyEvents.unshift(event);
        setOrderedEvents(copyEvents);
    }

    // check if there's event in year in order to display them
    const checkEvents = () => {
        const selectedCategories = categories.filter(cat => cat.selected);
        const events = selectedYear.events.filter((event: Event) => {
            if (selectedCategories.find((category: Category) => category.name === event.category)) {
                return event;
            }
        })
        return events.length > 0 ? true : false;
    }

    // display events in a tab
    const displayEventsTab = () => {
        const selectedCategories = categories.filter((category: Category) => category.selected);
        const events: Event[] = selectedYear.events;

        return events.map((event: Event) => {
            if (selectedCategories.find((category: Category) => category.name === event.category)) {
                return (
                    <div key={`${event._id}`} className={`event-tab-details ${event.selected ? "selected" : null}`} onClick={() => handleSelectedEvent(event)}>
                        <span className="title">{event.title}</span>
                        <br />
                        <span>
                            {textDate(event.full_date)}
                            <small> ({event.photosNumber} photos)</small>
                        </span>
                    </div>
                )
            }
        })
    }


    return (
        <div className="full-year-wrapper">
            <div className="year-header">
                <div className="year-details">
                    <h2>Année {selectedYear.date}</h2>
                </div>
                <div className="filters-component">
                    <Filters categories={categories} setSelectedCategory={handleSelectCategory} />
                </div>
            </div>
            {
                checkEvents() ?
                    <div>
                        <div className="year-tab">
                            <div className="events-tab-wrapper">
                                {displayEventsTab()}
                            </div>
                        </div>
                        <div className="thumbnails-wrapper">
                            {
                                orderedEvents.filter(evt => { return evt.selected }).length > 0 ?
                                    orderedEvents.map((event: Event) => {
                                        let isShowed: boolean;
                                        categories.filter((category: Category) => category.selected).find((category: Category) => category.name === event.category) ?
                                            isShowed = true :
                                            isShowed = false;

                                        if (event.photos) {
                                            return displayPhotos(event, isShowed)
                                        }
                                    })
                                    : <h3>Cliquez sur un évènement pour afficher les photos</h3>
                            }
                        </div>
                    </div> :
                    <div>
                        <h3>Aucun évènement</h3>
                    </div>
            }
        </div>
    )
}
export default PhotosThumbnails;