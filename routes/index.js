var express = require('express');
var router = express.Router();
const amqp = require('amqplib')

/* GET home page. */
router.get('/', async function(req, res, next) {

  res.render('index', { title: 'Express' });
});

router.get('/send-message', async (req,res) => {

  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel()
    await channel.assertQueue("test-queue"); // kanalda queue1 dinle

    await channel.sendToQueue("test-queue", Buffer.from(JSON.stringify({id:1,name:"test"})));
        
    // close the channel and connection
    await channel.close();
    await connection.close(); 

    res.status(200).json("mesaj gönderildi");

  } catch (error) {
    res.status(200).json("hata");
  }

})

module.exports = router;
