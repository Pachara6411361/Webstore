// pages/api/monitors.js
import connectDB from '../../lib/db';
import Monitor from '../../models/Monitor';

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case 'GET': // Read all monitor products
      try {
        const monitors = await Monitor.find();
        res.status(200).json(monitors);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch monitors' });
      }
      break;
    case 'POST': // Create a new monitor product
      try {
        const newMonitor = new Monitor(req.body);
        await newMonitor.save();
        res.status(201).json(newMonitor);
      } catch (error) {
        res.status(400).json({ error: 'Failed to add monitor product' });
      }
      break;
    case 'PUT': // Update a monitor product by ID
      try {
        const monitor = await Monitor.findByIdAndUpdate(req.query.id, req.body, { new: true });
        res.status(200).json(monitor);
      } catch (error) {
        res.status(400).json({ error: 'Failed to update monitor product' });
      }
      break;
    case 'DELETE': // Delete a monitor product by ID
      try {
        await Monitor.findByIdAndDelete(req.query.id);
        res.status(200).json({ message: 'Monitor deleted' });
      } catch (error) {
        res.status(400).json({ error: 'Failed to delete monitor product' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
