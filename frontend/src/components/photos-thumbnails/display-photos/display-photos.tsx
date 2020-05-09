import React from "react";
import "./display-photos.css";
import { Photo, Event } from "../../../pages/events/events-page";

// displayPhotos props interface declaration
interface DisplayPhotosProps {
    selectedEvent: Event;
}

const DisplayPhotos = ({ selectedEvent }: DisplayPhotosProps) => {
    // loop through photos then display event associated photos
    const displayEventPhotos = (photos: Photo[]) => {
        return photos.map((photo: Photo) => {
            return (
                <div key={photo._id} className="photos-wrapper">
                    <img src={`http://localhost:8080/static/photos/${photo.path}`} width="150px" height="150px" />
                    {/* <span>{photo.name}</span><br /> */}
                </div>
            )
        })
    }

    return (
        <div style={{ border: `2px solid white`, marginBottom: `2%` }}>
            <h3>{selectedEvent.title} {selectedEvent.full_date}</h3>
            <div className="display-photos">
                {displayEventPhotos(selectedEvent.photos)}
            </div>
        </div>
    )
}

export default DisplayPhotos;