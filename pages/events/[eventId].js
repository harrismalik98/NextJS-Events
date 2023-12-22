import EventSummary from "../../components/event-detail/EventSummary";
import EventLogistics from "../../components/event-detail/EventLogistics";
import EventContent from "../../components/event-detail/EventContent";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import Head from "next/head";
import Comments from "../../components/input/comments";

const EventDetailPage = (props) => {

    const event = props.event;

    if (!event)
    {
        return (
          <div className="center">
            <p>Loading...</p>
          </div>
        );
    }

    return(
        <>
            <Head>
                <title>{event.title}</title>
            </Head>
            <EventSummary title={event.title}/>
            <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title}/>
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
            <Comments eventId={event.id}/>
        </>
    )
}

export default EventDetailPage;



export const getStaticProps = async (context) => {
    const eventId = context.params.eventId;

    const selectedEvent = await getEventById(eventId);

    return({
        props:{
            event: selectedEvent
        },
        revalidate: 30
    })
}



export const getStaticPaths = async () => {
    const events = await getFeaturedEvents();

    const paths = events.map(event => ({ params: { eventId: event.id } }));

    return{
        paths:paths,
        fallback:'blocking'
    };
}