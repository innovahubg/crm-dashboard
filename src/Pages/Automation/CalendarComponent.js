import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"

const CalendarComponent = ({ setModal, setType, setDetails, events }) => {
    const eventsData = events?.map(({ run, name, id, type }) => {
        // if (type == "registered") {
        const { year, month, day } = run
        const monthFormat = month <= 9 ? "0" + (month + 1) : (month + 1)
        return {
            title: name,
            date: `${year}-${monthFormat}-${day}`,
            id
        }
        // }
    })

    const handleDateClick = (arg) => {
        setType("new")
        setModal(true)
        console.log({ arg })
    }

    const handleEventClick = (info) => {
        info.jsEvent.preventDefault(); // don't let the browser navigate
        // console.log(info.event.title, info.event.id)
        const obj = events.find(e => e.id === info.event.id)
        setDetails(obj)
        setType("details")
        setModal(true)
        console.log("info", info)
    }
    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={eventsData}
                eventClick={handleEventClick}
                dateClick={handleDateClick}
                locale={"es"}
            />
        </div>
    )
}

export default CalendarComponent