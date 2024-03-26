// @ts-nocheck
const express = require('express');
const app = express();

const admin = require('firebase-admin');
const serviceAccount = require('./notification-d2cce-firebase-adminsdk-ol6x6-ac95dd44ff.json'); // Replace with the path to your service account JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(express.json());

app.post('/send-notification', (req, res) => {
  const {token, title, body} = req.body;

  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log('Notification sent:', response);
      res.status(200).json({message: 'Notification sent successfully'});
    })
    .catch((error) => {
      console.error('Error sending notification:', error);
      res.status(500).json({error: error.message});
    });
});



app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
})






//   mongodb+srv://Ashwani:asdfghjkl@cluster0.gy8npqa.mongodb.net/admin?authSource=admin&replicaSet=atlas-g9c3ws-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true