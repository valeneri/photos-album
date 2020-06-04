import React, { useLayoutEffect, useState } from "react";
import * as api from "../../shared/api";
import { Category, CategoryGroup, Event, YearEvents } from "../../shared/models";
import Categories from "./categories/categories";
import DisplayPhotosThumbnails from "./display-photos-thumbnails/display-photos-thumbnails";
import EventsTab from "./events-tab/events-tab";
import "./photos-thumbnails.css";

interface PhotosThumbnailsProps {
    selectedYear: YearEvents;
    categories: Category[];
    setSelectedEvent: any;
    setSelectedPhoto: any;
    setSelectedCategories: any;
}

const PhotosThumbnails = ({ selectedYear, categories, setSelectedEvent, setSelectedCategories, setSelectedPhoto }: PhotosThumbnailsProps) => {

    // set events list
    const [events, setEvents] = useState<Event[]>([]);

    // keep local events state to be displayed in tabs
    // /!\ display children ONLY when events state is set, thus useLayoutEffect /!\
    useLayoutEffect(() => {
        setEvents(displayEvents(selectedYear.events));
    }, [selectedYear.events])

    const displayEvents = (events: Event[]) => {
        const eventsCopy = Array.from(events);
        const selectedCategoriesGroup = selectedYear.categoryGroup.filter(cat => cat.selected);

        const filteredEventsCopy = eventsCopy.filter((event: Event) => {
            return selectedCategoriesGroup.find(cat => cat.category.name === event.category.name);
        })
        return filteredEventsCopy;
    }

    // handle categories on select, then filter events 
    const handleSelectCategories = (categoriesGroup: CategoryGroup[]) => {
        const selectedCategoriesGroup = categoriesGroup.filter(cat => cat.selected);
        const eventsCopy = Array.from(selectedYear.events);

        const filteredEventsCopy = eventsCopy.filter((event: Event) => {
            return selectedCategoriesGroup.find(cat => cat.category.name === event.category.name);
        })

        const yearWithCategoriesCopy = selectedYear;
        yearWithCategoriesCopy.categoryGroup = categoriesGroup;
        setSelectedCategories(yearWithCategoriesCopy);
        setEvents(filteredEventsCopy);
    }

    // get selected event photos if there aren't any already, then toggle selected flag
    const handleSelectEvent = async (event: Event) => {
        const copyEvents = Array.from(selectedYear.events);

        if (!event.photos) {
            const tag = event.eventTag;
            const response = await api.getPhotosByEventTag(tag);
            event["photos"] = response.data;
        }

        copyEvents.forEach((evt: Event) => {
            if (evt._id === event._id) {
                // evt = event;
                evt.selected = !evt.selected;
            } else {
                evt.selected = false
            }
        })
        setSelectedEvent(event);
    }

    return (
        <div className="full-year-wrapper">
            <div className="year-header">
                <div className="year-details">
                    <h2>Année {selectedYear.date}</h2>
                </div>
                {
                    categories &&
                    <div className="categories-component">
                        <Categories
                            fullCategoriesList={categories}
                            yearCategoriesGroup={selectedYear.categoryGroup}
                            setSelectedCategories={handleSelectCategories}
                        />
                    </div>
                }
            </div>
            {
                events.length === 0 ?
                    <div style={{ marginLeft: `2%` }}>
                        <h3>Aucun évènement</h3>
                    </div> :
                    <div>
                        <EventsTab events={events} setSelectedEvent={handleSelectEvent} />
                        {
                            events.filter(evt => evt.selected)[0] ?
                                <div className="thumbnails-wrapper">
                                    <DisplayPhotosThumbnails selectedEvent={events.filter(evt => evt.selected)[0]} setSelectedPhoto={setSelectedPhoto} />
                                </div>
                                : <h3 style={{ textAlign: `left`, marginLeft: `2%` }}>Cliquez sur un évènement pour afficher les photos</h3>
                        }
                    </div>
            }
        </div>
    )
}
export default PhotosThumbnails;