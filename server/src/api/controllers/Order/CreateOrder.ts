import { OrderService } from "../../services/OrderService";

interface IcreateOrder {
  create (args : any) : Promise<void>
}

class CreateOrder implements IcreateOrder{
  orderService: InstanceType<typeof OrderService>;

  constructor() {
    this.orderService = new OrderService();    
  }

  async create(args : any): Promise<void> {
    await this.orderService.createOrder(
        {
          items: [
            {
              productId: "12345",
              quantity: 2,
            },
            {
              productId: "67890",
              quantity: 1,
            },
          ],
          customerId: "dummy",
        }
      );
      
  }
}

export default CreateOrder;