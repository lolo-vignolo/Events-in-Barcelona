import { getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/event-list';
import { getSession } from 'next-auth/react';

function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
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

export default HomePage;
