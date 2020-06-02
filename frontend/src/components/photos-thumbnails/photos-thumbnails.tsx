import React, { useState } from "react";
import * as api from "../../api/api";
import { Category, Event, YearEvents } from "../../pages/events/events-page";
import { textDate } from '../../utils/utils';
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
    const initCategories: Category[] = [
        { value: 0, label: "Total", name: "total", selected: true },
        { value: 0, label: "Anniversaires", name: "birthday", selected: true },
        { value: 0, label: "Vacances", name: "holidays", selected: true },
        { value: 0, label: "Noël", name: "xmas", selected: true },
        { value: 0, label: "Nature", name: "nature", selected: true },
        // { value: 0, label: "Autre", name: "other", selected: true },
        { value: 0, label: "Non classé", name: "untagged", selected: true },
    ];

    // count year events categories
    const countCategories = (year: YearEvents): Category[] => {
        year.events.forEach((event: Event) => {
            switch (event.category) {
                case "birthday":
                    initCategories[1].value++;
                    break;
                case "holidays":
                    initCategories[2].value++;
                    break;
                case "xmas":
                    initCategories[3].value++;
                    break;
                case "nature":
                    initCategories[4].value++;
                    break;
                // case "other":
                //     initCategories[5].value++;
                //     break;
                default:
                    initCategories[5].value++;
                    break;
            }
        });
        let sum = 0;
        for (let i = 1; i < initCategories.length; i++) {
            sum += initCategories[i].value;
        }
        initCategories[0].value = sum;
        return initCategories;
    }

    // set events categories
    const [categories, setCategories] = useState<Category[]>(countCategories(selectedYear));
    // events list
    const [events, setEvents] = useState<Event[]>(selectedYear.events);

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
        const categoriesWithoutTotal = categories.filter((cat: any) => { return (cat.value > 0 && cat.name !== 'total') });

        // if "all" button selected, select all others
        // else if all others selected, select "all" button
        // else deselect "all" button
        if (categoriesWithoutTotal.every((category: any) => category.selected)) {
            categories[0].selected = true;
        } else {
            categories[0].selected = false;
        }
        setCategories(categories);
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
            const tag = `${event.title}_${event.full_date}`;
            const response = await api.getPhotosByEvent(tag);
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
                    <Categories categories={categories} setSelectedCategory={handleSelectCategory} />
                </div>
            </div>
            {
                checkEvents() ?
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
                    </div> :
                    <div style={{ marginLeft: `2%` }}>
                        <h3>Aucun évènement</h3>
                    </div>
            }
        </div>
    )
}
export default PhotosThumbnails;