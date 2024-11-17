import { NextApiRequest, NextApiResponse } from 'next';
import { createUser, findUserByEmail } from '../../models/User';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (findUserByEmail(email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = createUser({ email, password, name });
    res.status(201).json({ message: 'User created successfully', user: { id: newUser.id, email: newUser.email, name: newUser.name } });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
