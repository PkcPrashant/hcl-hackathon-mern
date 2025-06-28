import { Consumer, EachMessagePayload } from "kafkajs";

export interface IConsumer {
  connect(): Promise<void>;
  handle(message: any): Promise<void>
  disconnect(): Promise<void>;
}

export class OrderConsumer implements IConsumer {
  private readonly consumer!: Consumer;
  private topic = process.env.KAFKA_TOPIC || 'default-topic';

  constructor(kafka: any, groupId: string) {
    this.consumer = kafka.consumer({ groupId });
  }

  public connect(): Promise<void> {
    return this.consumer.connect()
      .then(() => this.consumer.subscribe({ topic: this.topic }))
      .then(() => this.consumer.run({ eachMessage: payload => this.handle(payload) }))
      .catch(e => {
        console.log(`Can't connect ${e}`);
        throw e;
      });
  }
  
  public handle({ topic, partition, message }: EachMessagePayload): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        console.log({
          topic,
          partition,
          value: message.value?.toString(),
        });
        resolve();
      } catch (e) {
        console.log(`Error on handle message ${e}`);
        reject(e);
      }

    });
  }

  disconnect(): Promise<void> {
    return this.consumer.disconnect()
      .catch(e => console.log(`Error on disconnect ${e}`));
  }
}