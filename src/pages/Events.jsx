import React, { useState, useEffect } from 'react'
import Kalend, { CalendarView } from 'kalend';
import 'kalend/dist/styles/index.css'
import axios from 'axios'
import AddEvent from '../components/AddEvent';

const Events = () => {

    const [open, setOpen] = useState(false);
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const resultEvents = await axios.get('/api/events/all');
            const resultEventsData = resultEvents.data;
            //const sortResultUserData = resultUserData.sort((a, b) => b.createdAt.localCompare(a.createdAt));
            const sortResultEventsData = resultEventsData.sort((b, a) => b.createdAt - a.createdAt);
            setEvents(sortResultEventsData);
        }
        fetchData();
    }, []);

    // const events = [
    //     {
    //         id: 1,
    //         startAt: '2021-11-21T18:00:00.000Z',
    //         endAt: '2021-11-21T19:00:00.000Z',
    //         timezoneStartAt: 'Europe/Berlin', // optional
    //         summary: 'test',
    //         color: 'blue',

    //     },
    //     {
    //         id: 2,
    //         startAt: '2021-11-21T18:00:00.000Z',
    //         endAt: '2021-11-21T19:00:00.000Z',
    //         timezoneStartAt: 'Europe/Berlin', // optional
    //         summary: 'test',
    //         color: 'blue'
    //     },
    //     {
    //         id: 3,
    //         startAt: '2022-12-21T18:50:00.000Z',
    //         endAt: '2023-01-21T18:00:00.000Z',
    //         timezoneStartAt: 'Europe/Berlin', // optional
    //         summary: 'We are starting work for a client from Koru',
    //         color: 'blue'
    //     }
    // ]

    return (
        <div className='e-container'>
            <div className="e-row d-flex">
                <h3 className="e-title">Events</h3>
                <button className="u-btn btn-a"
                    onClick={() => setOpen(true)}
                >Add New</button>
            </div>
            <div className="e-row">
                <Kalend
                    // onEventClick={onEventClick}
                    // onNewEventClick={onNewEventClick}
                    events={events}
                    initialDate={new Date().toISOString()}
                    hourHeight={60}
                    initialView={CalendarView.WEEK}
                    disabledViews={[CalendarView.DAY]}
                    // onSelectView={onSelectView}
                    // selectedView={selectedView}
                    // onPageChange={onPageChange}
                    timeFormat={'24'}
                    weekDayStart={'Monday'}
                    calendarIDsHidden={['work']}
                    language={'en'}
                />
            </div>
            {open && <AddEvent setOpen={setOpen} />}
        </div>
    )
}

export default Events