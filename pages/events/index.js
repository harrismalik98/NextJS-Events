import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";
import { getAllEvents } from "../../dummy-data";

const AllEventsPage = () => {

    const router = useRouter();
    const allEvents = getAllEvents();

    const findEventsHandler = (year, month) => {
        router.push(`/events/${year}/${month}`);
    }

    return(
        <>
            <EventsSearch onSearch={findEventsHandler}/>
            <EventList items={allEvents}/>
        </>
    )
}

export default AllEventsPage;