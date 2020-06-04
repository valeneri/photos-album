import React from "react";
import { Event, Photo } from "../../../shared/models";
import "./display-photos-thumbnails.css";

// displayPhotos props interface declaration
interface DisplayPhotosThumbnailsProps {
    selectedEvent: Event;
    setSelectedPhoto: any;
}

const DisplayPhotosThumbnails = ({ selectedEvent, setSelectedPhoto }: DisplayPhotosThumbnailsProps) => {

    return (
        <div className="events-wrapper">
            <div className="event-description">
                {selectedEvent.description &&
                    <h5>{selectedEvent.description}
                        {selectedEvent.location && <pre><span>    (Lieu: {selectedEvent.location})</span></pre>}
                    </h5>
                }
            </div>

            <div className="display-photos">
                {/* loop through photos then display event associated photos */}
                {selectedEvent && selectedEvent.photos.map((photo: Photo) => {
                    return (
                        <div key={photo._id} className="photos-wrapper" onClick={() => setSelectedPhoto(photo, selectedEvent)}>
                            <img className="photos" src={`http://localhost:8080/static/photos/${photo.path}`} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DisplayPhotosThumbnails;