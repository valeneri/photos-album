import React, { useEffect, useState } from "react";
import * as api from "../../api/api";
import PhotosThumbnails from "../../components/photos-thumbnails/photos-thumbnails";
import { sortByDateAsc } from '../../utils/utils';
import "./events-page.css";
import Timeline from "../../components/timeline/timeline";

export interface Event {
    _id: string,
    category: string,
    title: string,
    date: string,
    full_date: string,
    description: string,
    location: string,
    selected: boolean,
    photosNumber: number,
    priority: number,
    photos: any[]
}

export interface Photo {
    _id: string,
    name: string,
    title: string,
    path: string,
    date: string
    eventTag: string
}

export interface YearEvents {
    _id: string,
    category: string,
    title: string,
    date: string,
    selected: boolean,
    isEvent: boolean,
    eventsNumber: number,
    events: Event[],
    photos: Photo[],
}

const EventsPage = () => {
    const initCategories = [
        { value: 0, label: "Anniversaires", name: "birthday", selected: false },
        { value: 0, label: "Vacances", name: "holidays", selected: false },
        { value: 0, label: "Noël", name: "xmas", selected: false },
        { value: 0, label: "Abstrait", name: "abstract", selected: false },
        { value: 0, label: "Autre", name: "other", selected: false },
        { value: 0, label: "Non classé", name: "untagged", selected: false },
        { value: 0, label: "Total", name: "total", selected: false }
    ];

    /*  states declaration */
    // set years events full list
    const [yearsEventsList, setYearsEventsList] = useState<YearEvents[]>([]);
    // set events categories
    const [categories, setCategories] = useState<any[]>(initCategories);

    // Get all years without associated events on component mounting
    useEffect(() => {
        const getAllYears = async () => {
            const response = await api.getAllYearsWithoutEvents();
            setYearsEventsList(response.data);
        }
        getAllYears();
    }, []);

    // handle actions on select, base on event category
    const handleSelectEvent = (event: any) => {
        event.category === "year" ? selectYear(event) : selectEvent(event);
    };

    // handle categories on select, then filter events 
    const handleSelectCategory = (categories: any[]) => {
        // if "all" button selected, select all others
        // else if all others selected, select "all" button
        // else deselect "all" button
        autoSelectAllCategories(categories);
    }

    // Get events in the selected year, toggle selected flag then count events categories & filter
    const selectYear = async (yearEvents: YearEvents) => {
        const index = yearsEventsList.findIndex(year => year._id === yearEvents._id);
        const copyYearsEventsList = [...yearsEventsList];

        if (!yearEvents.events && index != -1) {
            const response = await api.getEventsByYear(yearEvents.date);
            copyYearsEventsList[index]["events"] = response.data;

            sortByDateAsc(copyYearsEventsList[index].events);
        }

        copyYearsEventsList[index].selected = !copyYearsEventsList[index].selected;

        const categories = countCategories(copyYearsEventsList[index]);
        autoSelectAllCategories(categories);

        // if (!copyYearsEventsList[index].selected) {
        //     copyYearsEventsList[index].events.forEach((event: Event) => {
        //         event.selected = false;
        //     })
        // }
        setYearsEventsList(copyYearsEventsList);
    }

    // Get event's photos and toggle selected flag 
    const selectEvent = async (event: Event) => {
        const copyYearsEventsList = [...yearsEventsList];

        copyYearsEventsList.forEach(yearEvents => {
            if (yearEvents.events) {
                const eventIndex = yearEvents.events.findIndex(evt => evt._id === event._id);
                if (eventIndex !== -1) {
                    yearEvents.events[eventIndex] = event;
                }
            }
        })

        setYearsEventsList(copyYearsEventsList);
    }

    // count year events categories, incremented or decremented if year is selected or not
    const countCategories = (year: YearEvents) => {
        const categoriesCopy = [...categories];
        const selected = year.selected;

        year.events.forEach((event: Event) => {
            switch (event.category) {
                case "birthday":
                    selected ? categoriesCopy[0].value++ : categoriesCopy[0].value--;
                    break;
                case "holidays":
                    selected ? categoriesCopy[1].value++ : categoriesCopy[1].value--;
                    break;
                case "xmas":
                    selected ? categoriesCopy[2].value++ : categoriesCopy[2].value--;
                    break;
                case "abstract":
                    selected ? categoriesCopy[3].value++ : categoriesCopy[3].value--;
                    break;
                case "other":
                    selected ? categoriesCopy[4].value++ : categoriesCopy[4].value--;
                    break;
                default:
                    selected ? categoriesCopy[5].value++ : categoriesCopy[5].value--;
                    break;
            }
        });
        let sum = 0;
        for (let i = 0; i < categoriesCopy.length - 1; i++) {
            sum += categoriesCopy[i].value;
        }
        categoriesCopy[6].value = sum;
        // setCategories(categoriesCopy);
        return categoriesCopy;
    }

    const autoSelectAllCategories = (categories: any[]) => {
        const categoriesCopy = [...categories];
        const categoriesWithoutTotal = categoriesCopy.slice(0, 6).filter((cat: any) => cat.value > 0);

        // if "all" button selected, select all others
        // else if all others selected, select "all" button
        // else deselect "all" button
        if (categoriesWithoutTotal.every((category: any) => category.selected)) {
            categoriesCopy[6].selected = true;
        } else {
            categoriesCopy[6].selected = false;
        }
        setCategories(categoriesCopy);
    }


    return (
        <div className="main-wrapper">
            <div className="timeline-component">
                {
                    yearsEventsList.length > 0 &&
                    <Timeline yearsEventsList={yearsEventsList}
                        setSelectedEvent={handleSelectEvent}
                        categories={categories}
                        setSelectedCategory={handleSelectCategory}
                    />
                }
            </div>
            <div className="photos-thumbnails-component">
                {
                    categories &&
                    categories.filter(cat => cat.selected).length > 0 &&
                    yearsEventsList.map((year: YearEvents) => {
                        if (year.selected && year.events.length > 0) {
                            return (
                                <div className="photos-thumbnails" key={year._id}>
                                    <PhotosThumbnails selectedYear={year} setSelectedEvent={handleSelectEvent} categories={categories} />
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
};

export default EventsPage;

