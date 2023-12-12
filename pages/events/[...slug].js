import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import ErrorAlert from "../../components/UI/ErrorAlert";
import Button from "../../components/UI/Button";
import { getFilteredEvents } from "../../helpers/api-util";

const FilteredEventsPage = (props) => {

    if(props.hasError)
    {
        return(
            <>
                <ErrorAlert>
                    <p>Invalid filter. Please adjust your values!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </>
        )
    }

    const filteredEvents = props.events;

    if(!filteredEvents || filteredEvents.length === 0)
    {
        return(
            <>
                <ErrorAlert>
                    <p>No events found for the chosen filter!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </>
        )
    }

    const date = new Date(props.date.year, props.date.month-1);

    return(
        <>
            <ResultsTitle date={date}/>
            <EventList items={filteredEvents} />
        </>
    )
}

export default FilteredEventsPage;



export const getServerSideProps = async (context) => {
    const {params} = context;

    const filterData = params.slug;

    const year = +filterData[0];
    const month = +filterData[1];

    if(isNaN(year) || isNaN(month) || year<2021 || year>2030 || month<1 || month>12)
    {
        return{
            props:{
                hasError: true
            },
            // notFound: true,                    // This take us to 404-page
            // redirect:{                         // This will redirect to an error-page
            //     destination:"/error"
            // }
        }
    }

    const dateFilter = {year, month};

    const filteredEvents = await getFilteredEvents(dateFilter);

    return{
        props:{
            events: filteredEvents,
            date:{
                year: year,
                month: month
            }
        }
    }
}