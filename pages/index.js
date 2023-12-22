import EventList from "../components/events/EventList";
import NewsletterRegistration from "../components/input/NewsletterRegistration";
import { getFeaturedEvents } from "../helpers/api-util";

const HomePage = (props) => {

    return(
        <>
            <NewsletterRegistration />
            <EventList items={props.events}/>
        </>
        
    )
}

export default HomePage;

export const getStaticProps = async (context) => {
    const featuredEvents = await getFeaturedEvents();

    return{
        props:{
            events:featuredEvents
        },
        revalidate: 1800
    }
}