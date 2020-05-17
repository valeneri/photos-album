import React from "react";
import "./display-photos.css";
import { Photo, Event } from "../../../pages/events/events-page";
import { textDate } from '../../../utils/utils';

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
                {displayEventPhotos(selectedEvent.photos)}
            </div>
        </div>
    )
}

export default DisplayPhotos;