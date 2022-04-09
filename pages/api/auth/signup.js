import { hashPassword } from '../../../components/ui/auth';
import { connectToDatabase } from '../../../components/ui/db';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;

  const { email, password } = data;
  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 6
  ) {
    res.status(422).json({
      message:
        'Invalid input - password should also be at least 7 characters long.',
    });
    return;
  }

  const clientConection = await connectToDatabase();
  const db = clientConection.db();

  const existUser = await db.collection('userEvents').findOne({ email: email });

  if (existUser) {
    res
      .status(422)
      .json({ message: 'there already exist an user with that Email' });
    clientConection.close();
    return;
  }

  const myPassword = await hashPassword(password);

  const result = await db.collection('userEvents').insertOne({
    email: email,
    password: myPassword,
  });

  res.status(201).json({ message: 'Created User' });
  clientConection.close();
}

export default handler;
