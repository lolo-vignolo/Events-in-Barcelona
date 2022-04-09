import { useState, useEffect } from 'react';
import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { getSession } from 'next-auth/react';

function AllEventsPage() {
  const events = getAllEvents();

  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    fetch('/api/eventDB', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllEvents(data.allEvents);
      });
  }, []);

  console.log(allEvents);

  return (
    <>
      <EventsSearch />
      <EventList items={events} />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: true,
      },
    };
  }

  return {
    props: { session },
  };
}

export default AllEventsPage;
