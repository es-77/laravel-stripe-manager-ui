import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  Plan, 
  UserSubscription, 
  TrialInfo, 
  PaymentMethod, 
  ApiError, 
  ValidationError 
} from '../types';

export class StripeManagerApi {
  private api: AxiosInstance;

  constructor(baseUrl: string, token?: string) {
    this.api = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    // Response interceptor to handle errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.data) {
          const errorData = error.response.data;
          if (errorData.errors) {
            // Validation error
            throw {
              type: 'validation',
              data: errorData as ValidationError,
            };
          } else if (errorData.error || errorData.message) {
            // API error
            throw {
              type: 'api',
              data: errorData as ApiError,
            };
          }
        }
        throw {
          type: 'network',
          data: { error: 'Network Error', message: error.message },
        };
      }
    );
  }

  async getPlans(): Promise<Plan[]> {
    const response: AxiosResponse<{ data: Plan[] }> = await this.api.get('/plans');
    return response.data.data;
  }

  async getSubscription(): Promise<UserSubscription | null> {
    const response: AxiosResponse<{ data: UserSubscription | null }> = await this.api.get('/subscription');
    return response.data.data;
  }

  async getTrialInfo(userId?: number): Promise<TrialInfo> {
    const params = userId ? { user_id: userId } : {};
    const response: AxiosResponse<{ data: TrialInfo }> = await this.api.get('/trial-info', { params });
    return response.data.data;
  }

  async getPaymentMethods(): Promise<PaymentMethod[]> {
    const response: AxiosResponse<{ data: PaymentMethod[] }> = await this.api.get('/payment-methods');
    return response.data.data;
  }

  async selectPlan(planId: number, pricingId: number): Promise<void> {
    await this.api.post('/select-subscription-plan', {
      plan_id: planId,
      pricing_id: pricingId,
    });
  }

  async cancelSubscription(): Promise<void> {
    await this.api.delete('/cancel-subscription');
  }

  async saveStripeId(stripeId: string): Promise<void> {
    await this.api.post('/save-stripe-id', {
      stripe_id: stripeId,
    });
  }

  async setDefaultPaymentMethod(paymentMethodId: string): Promise<void> {
    await this.api.post('/set-default-payment-method', {
      payment_method_id: paymentMethodId,
    });
  }
}
