import { MessageProducer } from "./message_broker/Producer";

export class OrderService {
  private sender: any;


  constructor() {
    this.sender = new MessageProducer();
  }

  async createOrder(orderData: any): Promise<void> {
    try {
      // Validate order data
      if (!orderData || !orderData.items || orderData.items.length === 0) {
        throw new Error('Invalid order data');
      }

      // Send order data to Kafka topic
      await this.sender.send(JSON.stringify({
        messages: [
          { value: JSON.stringify(orderData) }
        ]
      }));

      console.log('Order created and sent to rmq:', orderData);
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }
}