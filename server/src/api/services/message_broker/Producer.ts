import amqp from "amqplib/callback_api.js";

export class MessageProducer {
    rabbit;
    constructor() {
        this.rabbit = amqp;
    }

    send(payload: string) {
      this.rabbit.connect(`amqp://${process.env.RABBIT_MQ_USERNAME}:${process.env.RABBIT_MQ_PASSWORD}@${process.env.RABBIT_MQ_HOST}:${process.env.RABBIT_MQ_PORT}/`, function(error, connection) {
          if (error) {
              throw error;
          }

          connection.createChannel((error1: any, channel: any) =>{
              if (error1) {
                  throw error1;
              }

              var data = JSON.stringify(payload);
              channel.assertQueue(process.env.RABBIT_MQ_QUEUE, {
                  durable: true
              });

              channel.sendToQueue(process.env.RABBIT_MQ_QUEUE, Buffer.from(data));
          });
      });
    }
}