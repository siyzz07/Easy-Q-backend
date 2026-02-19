import { ICustomer } from "../types/customerType";
import customer from "../models/customerModel";
import BaseRepository from "./baseRepository";
import { ICustomerRepositoryInterface } from "../interface/customer-interface/customer-repository-interface";

export class CustomerRepository
  extends BaseRepository<ICustomer>
  implements ICustomerRepositoryInterface
{
  private _customerModel = customer;

  constructor() {
    super(customer);
  }

  //----------------------------- add new customer
  async addNewCustomer(data: ICustomer): Promise<boolean> {
    const response = await this.create(data);
    return !!response;
  }

  //-----------------------------check customer exist or not
  async checkCustomerExist(email: string): Promise<boolean> {
    const customerCheck = await this.findByEmail(email);
    return !!customerCheck;
  }

  //-----------------------------get customer data take by email
  async customerDataByEmail(email: string): Promise<ICustomer | null> {
    const customer = await this.findByEmail(email);
    return customer;
  }

  //-----------------------------get custemer data  take by id
  async customerDataById(id: string): Promise<ICustomer | null> {
    const customer = await this.findById(id);
    return customer;
  }

  //-----------------------------reset custoemr passwod
  async resetPassword(email: string, hashedPassword: string): Promise<void> {
    await this.updatePassword(email, hashedPassword);
    return;
  }
  //-----------------------------updata custome profile
  async editProfile(data: {
    userId: string;
    name: string;
    email: string;
    phone: string;
  }): Promise<boolean> {
    const { userId, name, email, phone } = data;

    const result = await this._customerModel.findByIdAndUpdate(
      userId,
      {
        $set: { name, email, phone },
      },
      { new: true }
    );

    return !!result;
  }

  //========================================================================
  //----------------------------- get all customer data
  async getCusomersData(): Promise<ICustomer[] | []> {
    const result = await this.findAll();
    if (result) {
      return result;
    } else {
      return [];
    }
  }

  //----------------------------- block customer
  async blockCustomer(_id: string): Promise<boolean> {
    const updated = await this._customerModel
      .findByIdAndUpdate(_id, [{ $set: { isActive: { $not: "$isActive" } } }], {
        new: true,
      })
      .lean();
    return !!updated;
  }

  //----------------------------- get monthly customer growth
  async getMonthlyUserGrowth(year: number): Promise<any> {
    try {
      const stats = await this._customerModel.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(`${year}-01-01`),
              $lt: new Date(`${year + 1}-01-01`),
            },
          },
        },
        {
          $group: {
            _id: { $month: "$createdAt" },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id": 1 } },
      ]);
      return stats;
    } catch (error) {
      console.error("Error fetching monthly customer growth:", error);
      return [];
    }
  }
}
