import { connectToDatabase } from '../../components/ui/db';

async function handler(req, res) {
  const client = await connectToDatabase();
  const db = client.db();

  if (req.method === 'POST') {
    const { title, description, location, date, image, featured } = req.body;
    console.log(title, description, location, date, image, featured);
    if (
      !title ||
      !title.includes('') ||
      !image ||
      !description ||
      description.trim() === '' ||
      !location ||
      location.trim() === '' ||
      !featured
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    ///object to storage in my DB

    const newEvent = {
      title,
      image,
      description,
      location,
      date,
      featured,
    };
    try {
      const result = await db.collection('eventsBarcelona').insertOne(newEvent);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'Storing message failed!' });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: 'Successfully stored message!', message: newMessage });
  }

  if (req.method === 'GET') {
    try {
      const documents = await db
        .collection('eventsBarcelona')
        .find()
        .sort({ _id: -1 })
        .toArray();
      res.status(200).json(documents);
    } catch {
      (err) => console.log(err);
    }
  }

  client.close();
}

export default handler;
