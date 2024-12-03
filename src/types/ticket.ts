export interface Ticket {
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  isActivate: boolean;
  createdAt: string; // Firebase Timestamp
  updatedAt: string; // Firebase Timestamp
  "messages": TicketMessage[];
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  userId: string;
  message: string;
  isStaff: boolean;
  createdAt: any; // Firebase Timestamp
}