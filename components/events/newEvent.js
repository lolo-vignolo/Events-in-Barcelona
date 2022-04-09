import React from 'react';
import { useState } from 'react';
import Button from '../ui/button';
import createEvent from '../ui/postEvent';
import classes from './newEvent.module.css';

const NewEvent = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [featured, setFeatured] = useState('');

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleImage = (e) => {
    setImage(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleFeatured = (e) => {
    if (e.target.value === 'true') {
      setFeatured(true);
    } else if (e.target.value === 'false') {
      setFeatured(false);
    } else {
      setFeatured(e.target.value);
    }
  };

  const cratedEvent = {
    title,
    location,
    date,
    image,
    description,
    featured,
  };

  console.log(cratedEvent);

  async function handleSubmit(event) {
    event.preventDefault();
    if (cratedEvent) {
      try {
        const result = await createEvent(cratedEvent);
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <>
      <section className={classes.create}>
        <h1>create new Event</h1>
        <form onSubmit={handleSubmit}>
          <div className={classes.title}>
            <label htmlFor="title">Write a title</label>
            <input
              type="text"
              id="title"
              required
              value={title}
              onChange={handleTitle}
            />
          </div>
          <div className={classes.description}>
            <label htmlFor="description">write a Description</label>
            <textarea
              type="text"
              id="description"
              required
              value={description}
              onChange={handleDescription}
            />
          </div>
          <div className={classes.location}>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              required
              value={location}
              onChange={handleLocation}
            />
          </div>
          <div className={classes.date}>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              required
              value={date}
              onChange={handleDate}
            />
          </div>
          <div className={classes.img}>
            <label htmlFor="image">Image</label>
            <input
              type="url"
              id="image"
              required
              value={image}
              onChange={handleImage}
            />
          </div>
          <div className={classes.featured}>
            <label htmlFor="featured">Featured</label>
            <input
              type="text"
              id="featured"
              required
              value={featured}
              onChange={handleFeatured}
            />
          </div>
          <Button>Submit</Button>
        </form>
      </section>
    </>
  );
};

export default NewEvent;
