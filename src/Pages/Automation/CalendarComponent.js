import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"




const CalendarComponent = ({ setModal, setType, setDetails, events }) => {

    console.log({ events })

    const handleDateClick = (arg) => {
        console.log(arg.dateStr)
        setType("new")
        setModal(true)

    }

    const handleEventClick = (info) => {
        info.jsEvent.preventDefault(); // don't let the browser navigate
        console.log(info.event.title, info.event.id)
        setDetails({ title: info.event.title })
        setType("details")
        setModal(true)
    }
    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={[
                    { title: 'event 1', date: '2024-03-01', id: 1996 },
                    { title: 'event 2', date: '2024-03-01', id: 2123 }
                ]}
                eventClick={handleEventClick}
                dateClick={handleDateClick}
            />
        </div>
    )
}

export default CalendarComponent