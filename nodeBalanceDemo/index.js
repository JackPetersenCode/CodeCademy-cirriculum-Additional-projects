const express = require('express');
const router = express.Router();
const app = express();
let requestCount = 0;
router.get('/', (req,res) => {
    requestCount++;
      
    return res.json({
        message: 'Hello World!',
        numberOfCall: requestCount,
    });
});

app.use('/', router);

app.listen(process.argv[2] || process.env.PORT || 3000, () => {
    console.log(`App is listening at ${process.argv[2] || process.env.PORT || 3000}`);
});