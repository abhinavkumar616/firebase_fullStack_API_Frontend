// Imports
const express = require('express');
const router = express.Router();
const admin = require("firebase-admin");
const serviceAccount = require("../../service-account-key.json");
const NotificationDetail = require('../../models/notification-detail')
const _ = require('lodash')

// Initialize Firebase Admin
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});


/**
 * Send push notification to all devices, of all platforms.
 * 
 */
router.get('/send-to-all', function (req, res, next) {
	// Create a list containing up to 500 registration tokens.
	// These registration tokens come from the client FCM SDKs.
	const registrationTokens = [
		// 'cu-lltG7QbmJ9BSypDaK-G:APA91bHEEQDcdtAoYEzR1X7cwCnGiG5WFrLqM86W966taED8bDKWRQgPIP3C56eUFj6haFCxtVLFXJHAoYEzR1X7cwCnGiG5WFrLqM86W966taED8bDKWRQgPIP_Xgh2SasamSXHhioZ',
		// 'cu-lltG7QbmJ9BSypDaK-G:APA91bHEEQDcdtW4hqaTOyo2IRhIygS4sZUvehjWCONykvgrlLRVa3C56eUFj6haFCxtVLFXJHAoYEzR1X7cwCnGiG5WFrLqM86W966taED8bDKWRQgPIP_Xgh2Se3HlLstomSXHhioZ'

		// "dYysVE6GPwsDiygUvWydB3:APA91bFm5sBCHbqz-WtO36JNNLQCW_UiLb9CUMELhZGOoehkT95tM64Tqw2rj1YJK085pb4KIscMBruntKKR6ZZqN5Q3XYTYVWMaVS6Gj-_I3PGoOmXDRqjNaL3iTQ9DatEEOFMthpcH",
		// "AAAAhqMgehw:APA91bEGbYKXjeX4rp3ZI05OpOaMR2kOh55gKD7eMBfAzyWEnvVkQ0Tnn0Ds1RTgT7j2Y3wA66hT8Y70R1VC36efvO34oblCJmlpHnR8UNUvRWaMgrM0it44iMC5_FCnN4l80oF8lN1H",
		// "fHrfQLjgJWWCr4NUr99ijv:APA91bFuSDoqZf64Sk5tTPHVEjUWY4fIC8oBx14R_cY2pKl9c73OETg79J_6oIUfOTUzHckWengvEcwEKmNi27G-vSkiXFxdme-eB6Haq7JJp7avRTMHMr2grD6KZ4bvlqOBsOu2D9LI"

		"eMBR25un-3v0zVVJM_uFwV:APA91bGphHvmf_EwhaBG2tKfjyqgdLdQqQvwKuQzgGItQK2tyTXDZTHJ4R2PupVDoq6g6K-j0NX3L7S0HOLO5KMozyvmB5nN0MwC3PuA3vid2UMT5OjSivXGyA9rqZvV4AwcIplzO73V"
	]


	const message = {
		notification: {
			title: 'Holiday Offers!',
			body: 'Upto 50% OFF on shirts, bags and Accessories',
			image: 'https://c8.alamy.com/comp/KG34JA/christmas-sale-poster-holiday-discount-offer-shop-market-KG34JA.jpg'
		},
		tokens: registrationTokens
	};

	// Send a message to the device corresponding to the provided
	// registration tokens.

	admin.messaging().sendMulticast(message)
		.then((response) => {
			// Making chunks of responses
			const chunkSize = 100;
			const chunkedReponses = _.chunk(response.responses, chunkSize);

			// Storing the responses in chunks
			chunkedReponses.forEach(async (chunk) => {
				// Preparing the docs to insert
				const docsToInsertInBulk = chunk.map((resp, idx) => ({
					userId: registrationTokens[idx],
					status: resp.success,
					reason: resp.success ? undefined : resp.error.message,
					messageId: resp.success ? resp.messageId : undefined
				}))
				// Insert the prepared chunk of docs in bulk
				await NotificationDetail.insertMany(docsToInsertInBulk)
					.then(() => {
						console.log("Data inserted") // Success 
					}).catch((err) => {
						console.log(err) // Failure 
					});
			})
			res.status('200').send(response)
		})
		.catch((error) => {
			console.log('Error sending message:', error);
			res.status('400').send(error)
		});

});


module.exports = router;









// // Imports
// const express = require('express');
// const router = express.Router();
// const admin = require("firebase-admin");
// const serviceAccount = require("../../service-account-key.json");
// const NotificationDetail = require('../../models/notification-detail')
// const _ = require('lodash')

// // Initialize Firebase Admin
// admin.initializeApp({
// 	credential: admin.credential.cert(serviceAccount)
// });


// /**
//  * Send push notification to all devices, of all platforms.
//  * 
//  */
// router.get('/send-to-all', function (req, res, next) {
// 	// Create a list containing up to 500 registration tokens.
// 	// These registration tokens come from the client FCM SDKs.
// 	const registrationTokens = [
// 		// 'cu-lltG7QbmJ9BSypDaK-G:APA91bHEEQDcdtAoYEzR1X7cwCnGiG5WFrLqM86W966taED8bDKWRQgPIP3C56eUFj6haFCxtVLFXJHAoYEzR1X7cwCnGiG5WFrLqM86W966taED8bDKWRQgPIP_Xgh2SasamSXHhioZ',
// 		// 'cu-lltG7QbmJ9BSypDaK-G:APA91bHEEQDcdtW4hqaTOyo2IRhIygS4sZUvehjWCONykvgrlLRVa3C56eUFj6haFCxtVLFXJHAoYEzR1X7cwCnGiG5WFrLqM86W966taED8bDKWRQgPIP_Xgh2Se3HlLstomSXHhioZ'

// 		"dYysVE6GPwsDiygUvWydB3:APA91bFm5sBCHbqz-WtO36JNNLQCW_UiLb9CUMELhZGOoehkT95tM64Tqw2rj1YJK085pb4KIscMBruntKKR6ZZqN5Q3XYTYVWMaVS6Gj-_I3PGoOmXDRqjNaL3iTQ9DatEEOFMthpcH",
// 		"fHrfQLjgJWWCr4NUr99ijv:APA91bFuSDoqZf64Sk5tTPHVEjUWY4fIC8oBx14R_cY2pKl9c73OETg79J_6oIUfOTUzHckWengvEcwEKmNi27G-vSkiXFxdme-eB6Haq7JJp7avRTMHMr2grD6KZ4bvlqOBsOu2D9LI"
// 	]

// 	console.log("hello registration data");

// 	const message = {
// 		notification: {
// 			// title: 'Holiday Offers!',
// 			// body: 'Upto 50% OFF on shirts, bags and Accessories',
// 			// image: 'https://c8.alamy.com/comp/KG34JA/christmas-sale-poster-holiday-discount-offer-shop-market-KG34JA.jpg'
// 			title:"Hello"
// 		},
// 		tokens: registrationTokens
// 	};

// 	// Send a message to the device corresponding to the provided
// 	// registration tokens.
// 	admin.messaging().sendMulticast(message)
// 		.then((response) => {
// 			// Making chunks of responses
// 			const chunkSize = 100;
// 			const chunkedReponses = _.chunk(response.responses, chunkSize);

// 			// Storing the responses in chunks
// 			chunkedReponses.forEach(async (chunk) => {
// 				// Preparing the docs to insert
// 				const docsToInsertInBulk = chunk.map((resp, idx) => ({
// 					userId: registrationTokens[idx],
// 					status: resp.success,
// 					reason: resp.success ? undefined : resp.error.message,
// 					messageId: resp.success ? resp.messageId : undefined
// 				}))
// 				// Insert the prepared chunk of docs in bulk
// 				await NotificationDetail.insertMany(docsToInsertInBulk)
// 					.then(() => {
// 						console.log("Data inserted") // Success 
// 					}).catch((err) => {
// 						console.log(err) // Failure 
// 					});
// 			})
// 			res.status('200').send(response)
// 		})
// 		.catch((error) => {
// 			console.log('Error sending message:', error);
// 			res.status('400').send(error)
// 		});
// });


// module.exports = router;


/**
 * Reference Links:
 * 
 * Documentation link for building this app server for sending requests to FCM
 * https://firebase.google.com/docs/cloud-messaging/send-message
 * 
 * Documentation link for defining message payload:
 * https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages
 * 
 */