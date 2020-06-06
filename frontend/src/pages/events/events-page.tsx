import React, { useEffect, useState, useCallback } from "react";
import * as api from "../../shared/api";
import PhotosThumbnails from "../../components/photos-thumbnails/photos-thumbnails";
import Negative from "../../components/negative/negative";
import { usePhotosModal } from "../../shared/hooks/use-photos-modal";
import { sortEventsByDateAsc } from '../../shared/utils';
import "./events-page.css";
import { YearEvents, Event, Photo, Category, CategoryGroup } from "../../shared/models";

const EventsPage = () => {
    /*  states declaration */
    // set years events list (immutable for negative component)
    const [yearsList, setYearsList] = useState<YearEvents[]>([]);
    // set years events full list
    const [yearsEventsList, setYearsEventsList] = useState<YearEvents[]>([]);
    // set categories list
    const [categories, setCategories] = useState<Category[]>([]);
    // set selected thumbnails photo index
    const [startIndex, setStartIndex] = useState<number>(-1);
    // set selected thumbnails event
    const [displayedEvent, setDisplayedEvent] = useState<Event>();

    // photo modal hook
    const { show, RenderPhotosModal } = usePhotosModal();

    // Get all years without associated events and categories list on component mounting
    useEffect(() => {
        const getAllYearsAndCategories = async () => {
            const yearsResponse = await api.getAllYearsWithoutEvents();
            const categoriesResponse = await api.getAllCategories();

            setYearsEventsList(yearsResponse.data);
            setCategories(categoriesResponse.data);
            setYearsList(yearsResponse.data);
        }
        getAllYearsAndCategories();
    }, []);

    // Get events in the selected year, toggle selected flag then count events categories & filter
    const handleSelectYear = async (yearEvents: YearEvents) => {
        const index = yearsEventsList.findIndex(year => year._id === yearEvents._id);
        const copyYearsEventsList = [...yearsEventsList];

        // by default, year has no events if it has never been selected
        // => get all associated events
        // => set all categories to selected on first selection
        if (!yearEvents.events && index != -1) {
            const response = await api.getEventsByYear(yearEvents.date);
            copyYearsEventsList[index]["events"] = response.data;

            sortEventsByDateAsc(copyYearsEventsList[index].events);
            const selectedCategoriesGroup = autoSelect(copyYearsEventsList[index].categoryGroup);
            copyYearsEventsList[index].categoryGroup = selectedCategoriesGroup;
        }
        copyYearsEventsList[index].selected = !copyYearsEventsList[index].selected;

        setYearsEventsList(copyYearsEventsList);
    }

    // Get event's photos and toggle selected flag 
    const handleSelectEvent = (event: Event) => {
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

    // pass event photos and selected photo index on modal when selecting photo
    const handleSelectPhoto = (photo: Photo, event: Event) => {
        if (event && event.photos.length > 0) {
            const index = event.photos.findIndex((elem: Photo) => elem._id === photo._id);
            if (index !== -1) {
                setStartIndex(index);
                setDisplayedEvent(event);
                show();
            }
        }
    }

    // set selected categories into YearsEventsList
    const handleSelectCategories = (yearEvent: YearEvents) => {
        const copyYearsEventsList = [...yearsEventsList];
        const index = copyYearsEventsList.findIndex((year: YearEvents) => year._id === yearEvent._id);
        copyYearsEventsList[index] = yearEvent;
        setYearsEventsList(copyYearsEventsList);
    }

    // autoselect (selected = true) and add Total, by default before display in Categories component
    const autoSelect = (categoryGroup: CategoryGroup[]): CategoryGroup[] => {
        const categoryGroupCopy = Array.from(categoryGroup);
        let total: CategoryGroup = { category: { name: 'total', label: 'Toutes' }, value: 0, selected: true };
        let sum = 0;

        categoryGroupCopy.map((catGroup: CategoryGroup) => {
            catGroup['selected'] = true;
            sum += catGroup.value;
            return catGroup;
        })
        total.value = sum;
        categoryGroupCopy.unshift(total);
        return categoryGroupCopy;
    };

    return (
        <div className="main-wrapper">
            <div className="timeline-component">
                {
                    yearsList &&
                    yearsList.length > 0 &&
                    <Negative yearsEventsList={yearsList} setSelectedYear={handleSelectYear} />
                }
            </div>
            <div className="photos-thumbnails-component">
                {
                    yearsEventsList &&
                    yearsEventsList.map((year: YearEvents) => {
                        if (year.selected && year.events) {
                            return (
                                <div className="photos-thumbnails" key={year._id}>
                                    <PhotosThumbnails
                                        selectedYear={year}
                                        categories={categories}
                                        setSelectedEvent={handleSelectEvent}
                                        setSelectedPhoto={handleSelectPhoto}
                                        setSelectedCategories={handleSelectCategories}
                                    />
                                </div>
                            )
                        }
                    })
                }
            </div>
            <div className="photos-viewer">
                {
                    displayedEvent &&
                    startIndex >= 0 &&
                    <RenderPhotosModal photos={displayedEvent.photos} index={startIndex} />
                }
                <div id="modal-root" />
            </div>
        </div>
    )
};

export default EventsPage;

