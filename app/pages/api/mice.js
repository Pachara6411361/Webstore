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
        console.error('Error fetching mice:', error);
        res.status(500).json({ error: 'Failed to fetch mice' });
      }
      break;
    case 'POST': // Handle creating a new mouse product
      try {
        const { name, brand, wireless, price, image } = req.body;

        // Validate that all required fields are present
        if (!name || !brand || !wireless || !price) {
          return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a new mouse product instance with the validated data
        const newMouse = new Mouse({
          name,
          brand,
          wireless,
          price,
          image,
        });

        await newMouse.save(); // Save to the database
        res.status(201).json(newMouse);
      } catch (error) {
        console.error('Error adding mouse product:', error);
        res.status(400).json({ error: 'Failed to add mouse product', details: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
