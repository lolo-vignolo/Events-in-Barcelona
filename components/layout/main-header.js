import { signOut, useSession } from 'next-auth/react';
import { IoIosLogOut } from 'react-icons/io';

import Link from 'next/link';

import classes from './main-header.module.css';

function MainHeader() {
  const { data: session, status } = useSession();

  let adminUser = '';

  session ? (adminUser = session.user.email) : (adminUser = '');

  const handleLogout = () => {
    signOut();
  };

  return (
    <header className={classes.header}>
      {session && (
        <div className={classes.logo}>
          <img src="/images/logo.png" />
          <Link href="/">Home</Link>
        </div>
      )}

      <nav className={classes.navigation}>
        {!session && (
          <div className={classes.welcome}>
            <h1>Welcome to Events Barcelona, Loging to Start!</h1>
            <img src="/images/logo.png" />
          </div>
        )}
        {session && (
          <div>
            <Link href="/events">Search Events</Link>
          </div>
        )}
        {session && (
          <div className={classes.logout}>
            <button className={classes.button} onClick={handleLogout}>
              Logout
            </button>
            <IoIosLogOut style={{ fontSize: '1.5rem', color: 'red' }} />
          </div>
        )}
        {session && adminUser === 'test@test.com' && (
          <div>
            <Link href="/events/createEvent">Create</Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default MainHeader;
