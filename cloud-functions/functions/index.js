const { onSchedule } = require("firebase-functions/v2/scheduler");
const { onRequest } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, Timestamp, FieldValue } = require("firebase-admin/firestore");

// The es6-promise-pool to limit the concurrency of promises.
//const PromisePool = require("es6-promise-pool").default;

initializeApp();

exports.scheduledFunctionCrontab = onSchedule("5 11 * * *", async (event) => {
    //loop through all sessions
    let today = Timestamp.now();
    const querySnapshot = await getFirestore()
        .collection('session')
        .where(Filter.and(Filter(today, '<', 'book_available_from')))
        .get()

    querySnapshot.forEach(documentSnapshot => {
        logger.log(documentSnapshot.id)
    });
});

exports.addmessage = onRequest(async (req, res) => {
    const days = new Map([
        [0, "Sunday"],
        [1, "Monday"],
        [2, "Tuesday"],
        [3, "Wednesday"],
        [4, "Thursday"],
        [5, "Friday"],
        [6, "Saturday"],
    ]);

    //loop through all sessions
    const querySnapshot = await getFirestore()
        .collection('session')
        //.where('book_available_from', '<', today)
        .get()

    querySnapshot.forEach(documentSnapshot => {
        const today = new Date()
        const latestAvailableDate = documentSnapshot.data().latest_available_date;
        const endDate = documentSnapshot.data().end_date;
        const window_open = documentSnapshot.data().window_open
        const window_close = documentSnapshot.data().window_close
        const sessionDays = documentSnapshot.data().days

        const latestAvailableDateAsDate = latestAvailableDate.toDate()
        const hrs = latestAvailableDateAsDate.getHours()
        const mins = latestAvailableDateAsDate.getMinutes()
        latestAvailableDateAsDate.setDate(latestAvailableDateAsDate.getDate() + 1);
        let testDate = new Date(latestAvailableDateAsDate.getTime());
        testDate.setHours(hrs, mins, 0)

        logger.log(days.get(testDate.getDay()))

        const docref = documentSnapshot.ref;
        if ((today.setDate(today.getDate() + window_open)) > testDate && endDate > latestAvailableDate) {
            if (testDate.setHours(testDate.getHours - window_close) > today) {
                if (sessionDays.includes(days.get(testDate.getDay()))) {
                    logger.info("Opening up new session")
                    let obj = {}
                    obj.date = Timestamp.fromDate(testDate)
                    obj.bookings = []
                    docref.update({ available: FieldValue.arrayUnion(obj) })
                }
            }
        }

        docref.update({ latest_available_date: Timestamp.fromDate(testDate) })
    });

    // Send back a message that we've successfully written the message
    //res.json({ result: `Message with ID: ${writeResult.id} added.` });
});
