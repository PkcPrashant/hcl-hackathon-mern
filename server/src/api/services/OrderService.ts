import BrokerService from "./message_broker/BrokerService";
import { OrderProducer } from "./message_broker/Producer";
import { OrderConsumer } from "./message_broker/Consumer";

export class OrderService {
  private brokerService: any;
  private kafkaProducer: any;
  private kafkaConsumer: any;

  private topic = process.env.KAFKA_TOPIC || 'default-topic';
  private groupId = process.env.KAFKA_GROUP_ID || 'default-group';

  constructor() {
    this.brokerService = new BrokerService();
    this.kafkaProducer = new OrderProducer(this.brokerService.getKafka());
    this.kafkaConsumer = new OrderConsumer(this.brokerService.getKafka(), this.groupId);
  }

  async createOrder(orderData: any): Promise<void> {
    try {
      // Validate order data
      if (!orderData || !orderData.items || orderData.items.length === 0) {
        throw new Error('Invalid order data');
      }

      // Send order data to Kafka topic
      await this.kafkaProducer.send({
        topic: process.env.KAFKA_TOPIC,
        messages: [
          { value: JSON.stringify(orderData) }
        ]
      });

      console.log('Order created and sent to Kafka:', orderData);
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }
}