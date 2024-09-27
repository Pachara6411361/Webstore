// pages/api/mice.js
import connectDB from '../../lib/db';
import Mouse from '../../models/mouse';

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const mice = await Mouse.find();
        res.status(200).json(mice);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch mice' });
      }
      break;
    case 'POST': // Handle creating a new mouse product
      try {
        const newMouse = new Mouse(req.body); // Create a new instance with the incoming data
        await newMouse.save(); // Save to the database
        res.status(201).json(newMouse);
      } catch (error) {
        res.status(400).json({ error: 'Failed to add mouse product' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
