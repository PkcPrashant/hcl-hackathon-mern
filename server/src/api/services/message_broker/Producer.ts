import { Kafka, Producer } from "kafkajs";

export interface IProducer {
  send(topic: string, message: string, successCB: any, failureCB: any): Promise<any>;
}

export class OrderProducer implements IProducer {
  private readonly producer!: Producer;

  constructor(kafka: Kafka) {
    this.producer = kafka.producer();
    this.producer.connect()
      .then(() => console.log('Kafka producer connected'))
      .catch(e => {
        console.error(`Error connecting Kafka producer: ${e}`);
        throw e;
      });
  }

  public send(topic: string, message: string, successCB: any, failureCB: any): Promise<any> {
    return this.producer.send({
      topic: topic,
      messages: [{ value: message }],
    })
      .then(successCB)
      .catch(failureCB);
  }
}