import React, { useEffect, useState } from "react";
import { YearEvents } from "../../pages/events/events-page";
import * as api from "../../api/api";
import "./photos-thumbnails.css";

interface PhotosThumbnailsProps {
    selectedEvents: YearEvents[];
}

const PhotosThumbnails = ({ selectedEvents }: PhotosThumbnailsProps) => {

    const buildPhotos = (event: any) => {
        return event.photos.map((photo: any) => {
            return (<div key={photo._id} className="photos-wrapper">
                <span>{photo.name}</span><br />
                <img src={`http://localhost:8080/static/photos/${photo.path}`} width="150px" height="150px" />
            </div>)
        })
    }

    return (
        <div className="photos-thumbnails">
            {selectedEvents && selectedEvents.map((year: YearEvents) => {
                return (
                    <div key={year._id}>
                        <div className="separator">
                            <div className="years-details">
                                <div className="current-year">
                                    <h3>{year.date}</h3>
                                </div>
                                <div className="current-events">
                                    {year.events && year.events.map(event => {
                                        return (
                                            <div key={`${event._id}`} className="photos-events-list">
                                                <hr />
                                                <h5>{event.title}</h5>
                                            </div>)

                                    })
                                    }
                                </div>
                            </div>

                            <div>
                                <div className="photos">
                                    {buildPhotos(year)}
                                </div>
                            </div>



                            {/* <hr /> */}
                        </div>
                        <div className="line" />
                        <hr />
                    </div>
                )
            })
            }
        </div>
    )
}

export default PhotosThumbnails;