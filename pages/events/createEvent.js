import { getSession } from 'next-auth/react';
import React from 'react';
import NewEvent from '../../components/events/newEvent';

const createEvent = () => {
  return <NewEvent />;
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  const userName = session.user.email;
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: true,
      },
    };
  }
  if (session) {
    if (userName !== 'test@test.com') {
      return {
        redirect: {
          destination: '/',
          permanent: true,
        },
      };
    }
  }

  return {
    props: { session },
  };
}

export default createEvent;
