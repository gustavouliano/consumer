const amqp = require('amqplib');

var channel, connection;

async function connectQueue(){
    try{
        connection = await amqp.connect('amqp://rabbitmq');
        channel = await connection.createChannel();
        await channel.assertQueue('email-queue');

        channel.consume('email-queue', data => {
            console.log('processando envio de msg...');
            console.log(`${Buffer.from(data.content)}`);
            channel.ack(data);
        });
        }catch(e){
            console.log(e);
        }
}

connectQueue();
