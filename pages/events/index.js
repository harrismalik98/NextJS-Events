import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";
import { getAllEvents } from "../../helpers/api-util";

const AllEventsPage = (props) => {

    const router = useRouter();

    const findEventsHandler = (year, month) => {
        router.push(`/events/${year}/${month}`);
    }

    return(
        <>
            <EventsSearch onSearch={findEventsHandler}/>
            <EventList items={props.allEvents}/>
        </>
    )
}

export default AllEventsPage;

export const getStaticProps = async () => {
    const allEvents = await getAllEvents();

    return{
        props:{
            allEvents:allEvents
        },
        revalidate: 60
    }
}