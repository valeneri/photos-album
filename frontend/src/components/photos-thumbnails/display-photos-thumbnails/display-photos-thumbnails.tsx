import React from "react";
import { Event, Photo } from "../../../pages/events/events-page";
import "./display-photos-thumbnails.css";

// displayPhotos props interface declaration
interface DisplayPhotosThumbnailsProps {
    selectedEvent: Event;
    setSelectedPhoto: any;
}

const DisplayPhotosThumbnails = ({ selectedEvent, setSelectedPhoto }: DisplayPhotosThumbnailsProps) => {
    // loop through photos then display event associated photos
    const displayEventPhotos = (selectedEvent: Event) => {
        return selectedEvent.photos.map((photo: Photo) => {
            return (
                <div key={photo._id} className="photos-wrapper" onClick={() => setSelectedPhoto(photo, selectedEvent)}>
                    <img className="photos" src={`http://localhost:8080/static/photos/${photo.path}`} />
                </div>
            )
        })
    }

    return (
        <div className="events-wrapper">
            <div className="display-photos">
                {displayEventPhotos(selectedEvent)}
            </div>
        </div>
    )
}

export default DisplayPhotosThumbnails;