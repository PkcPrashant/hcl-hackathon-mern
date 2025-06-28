import { Kafka, KafkaConfig } from "kafkajs";

class BrokerService {

  private kafkaConfig: KafkaConfig;
  private kafka : Kafka;
  private kafkaUrl: string = process.env.KAFKA_BROKER_URL || 'localhost:9092';

  constructor() {
    this.kafkaConfig = {brokers: [this.kafkaUrl]};
    this.kafka = new Kafka(this.kafkaConfig);
  }

  public getKafka(): Kafka {
    return this.kafka;
  }
}

export default BrokerService;