// pages/api/headsets.js
import connectDB from '../../lib/db';
import Headset from '../../models/Headset';

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case 'GET': // Read all headset products
      try {
        const headsets = await Headset.find();
        res.status(200).json(headsets);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch headsets' });
      }
      break;
    case 'POST': // Create a new headset product
      try {
        const newHeadset = new Headset(req.body);
        await newHeadset.save();
        res.status(201).json(newHeadset);
      } catch (error) {
        res.status(400).json({ error: 'Failed to add headset product' });
      }
      break;
    case 'PUT': // Update a headset product by ID
      try {
        const headset = await Headset.findByIdAndUpdate(req.query.id, req.body, { new: true });
        res.status(200).json(headset);
      } catch (error) {
        res.status(400).json({ error: 'Failed to update headset product' });
      }
      break;
    case 'DELETE': // Delete a headset product by ID
      try {
        await Headset.findByIdAndDelete(req.query.id);
        res.status(200).json({ message: 'Headset deleted' });
      } catch (error) {
        res.status(400).json({ error: 'Failed to delete headset product' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

