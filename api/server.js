import express from 'express';
import multer from 'multer';
import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { getFirestore } from 'firebase-admin/firestore';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Initialize Firebase Admin
initializeApp({
  credential: cert({
    // Add your Firebase service account credentials here
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const db = getFirestore();
const storage = getStorage();

app.use(express.json());

// Ask endpoint
app.post('/api/ask', async (req, res) => {
  try {
    const { question, user_id } = req.body;
    
    // TODO: Implement AI model integration
    const response = "This is a placeholder response. AI model integration pending.";

    // Store the interaction in Firestore
    await db.collection('interactions').add({
      user_id,
      question,
      response,
      timestamp: new Date(),
    });

    res.json({ response });
  } catch (error) {
    console.error('Error processing question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Upload endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const { user_id, subject, teacher } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Upload file to Firebase Storage
    const bucket = storage.bucket();
    const blob = bucket.file(`${user_id}/${file.originalname}`);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (error) => {
      console.error('Error uploading to Firebase Storage:', error);
      res.status(500).json({ error: 'Upload failed' });
    });

    blobStream.on('finish', async () => {
      // Get the public URL
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      // Store metadata in Firestore
      await db.collection('materials').add({
        user_id,
        subject,
        teacher,
        file_url: publicUrl,
        uploaded_at: new Date(),
      });

      res.json({ url: publicUrl });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error('Error handling upload:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Retrieve endpoint
app.get('/api/retrieve', async (req, res) => {
  try {
    const { user_id, topic } = req.query;

    // Query Firestore for relevant materials
    const materialsQuery = db.collection('materials')
      .where('user_id', '==', user_id)
      .where('subject', '==', topic);

    const materials = await materialsQuery.get();
    const results = [];

    materials.forEach(doc => {
      results.push({ id: doc.id, ...doc.data() });
    });

    res.json({ materials: results });
  } catch (error) {
    console.error('Error retrieving materials:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Train endpoint
app.post('/api/train', async (req, res) => {
  try {
    // TODO: Implement model training logic
    res.json({ message: 'Training initiated' });
  } catch (error) {
    console.error('Error initiating training:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});