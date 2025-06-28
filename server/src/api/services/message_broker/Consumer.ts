import amqp from 'amqplib/callback_api.js'


export class OrderConsumer {

  public connect(): void {
    amqp.connect(`amqp://${process.env.RABBIT_MQ_USERNAME}:${process.env.RABBIT_MQ_PASSWORD}@${process.env.RABBIT_MQ_HOST}:${process.env.RABBIT_MQ_PORT}/`, function (error, connection) {
        if (error) {
            throw error;
        }

        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            channel.assertQueue('mediumQueue', {
                durable: false
            });

            channel.consume('mediumQueue', function (payload) {
                if (payload != null) {
                    let contents = JSON.parse(payload.content.toString())
                    console.log('===== Receive =====');
                    console.log(contents);
                }
            }, {
                noAck: true
            })
        });
    });
  }
}