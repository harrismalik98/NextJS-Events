import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import ErrorAlert from "../../components/UI/ErrorAlert";
import Button from "../../components/UI/Button";

const FilteredEventsPage = () => {

    const router = useRouter();
    const filterData = router.query.slug;

    if(!filterData)
    {
        return <p className="center">Loading...</p>
    }

    const year = +filterData[0];
    const month = +filterData[1];

    if(isNaN(year) || isNaN(month) || year<2021 || year>2030 || month<1 || month>12)
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

    const dateFilter = {year, month};
    // console.log(dateFilter);

    const filteredEvents = getFilteredEvents(dateFilter);

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

    const date = new Date(year, month-1);

    return(
        <>
            <ResultsTitle date={date}/>
            <EventList items={filteredEvents} />
        </>
    )
}

export default FilteredEventsPage;