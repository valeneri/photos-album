import React from "react";
import "./display-photos-thumbnails.css";
import { Photo, Event } from "../../../pages/events/events-page";
import { textDate } from '../../../utils/utils';

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
                    {/* <span>{photo.name}</span><br /> */}
                </div>
            )
        })
    }

    return (
        <div style={{ border: `2px solid white`, marginBottom: `1%`, marginTop: `1%` }}>
            <span><h3>{selectedEvent.title}</h3> {textDate(selectedEvent.full_date)}</span>
            <div className="display-photos">
                {displayEventPhotos(selectedEvent)}
            </div>
        </div>
    )
}

export default DisplayPhotosThumbnails;