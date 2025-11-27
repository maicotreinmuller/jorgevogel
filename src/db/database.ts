import Dexie, { Table } from 'dexie';

export interface Client {
  id?: number;
  name: string;
  document: string;
  phone: string;
  email: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  createdAt: Date;
}

export interface ServiceOrder {
  id?: number;
  orderNumber: number;
  clientId: number;
  clientName: string;
  product: string;
  description: string;
  observation?: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  value: number;
  date: Date;
}

export interface Purchase {
  id?: number;
  date: Date;
  supplier: string;
  document: string;
  invoiceNumber: string;
  product: string;
  description: string;
  value: number;
}

export class AppDatabase extends Dexie {
  clients!: Table<Client>;
  serviceOrders!: Table<ServiceOrder>;
  purchases!: Table<Purchase>;

  constructor() {
    super('AppDatabase');
    this.version(3).stores({
      clients: '++id, name, document, email, createdAt',
      serviceOrders: '++id, orderNumber, clientId, status, date',
      purchases: '++id, date, supplier, document, invoiceNumber'
    });
  }
}

export const db = new AppDatabase();
