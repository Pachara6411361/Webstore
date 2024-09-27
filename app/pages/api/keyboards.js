// pages/api/keyboards.js
import connectDB from '../../lib/db';
import Keyboard from '../../models/Keyboard';

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case 'GET': // Read all keyboard products
      try {
        const keyboards = await Keyboard.find();
        res.status(200).json(keyboards);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch keyboards' });
      }
      break;
    case 'POST': // Create a new keyboard product
      try {
        const newKeyboard = new Keyboard(req.body);
        await newKeyboard.save();
        res.status(201).json(newKeyboard);
      } catch (error) {
        res.status(400).json({ error: 'Failed to add keyboard product' });
      }
      break;
    case 'PUT': // Update a keyboard product by ID
      try {
        const keyboard = await Keyboard.findByIdAndUpdate(req.query.id, req.body, { new: true });
        res.status(200).json(keyboard);
      } catch (error) {
        res.status(400).json({ error: 'Failed to update keyboard product' });
      }
      break;
    case 'DELETE': // Delete a keyboard product by ID
      try {
        await Keyboard.findByIdAndDelete(req.query.id);
        res.status(200).json({ message: 'Keyboard deleted' });
      } catch (error) {
        res.status(400).json({ error: 'Failed to delete keyboard product' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
