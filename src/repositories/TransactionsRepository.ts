import Transaction from '../models/Transaction';
import TransactionType from '../models/Enumerators';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: TransactionType;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  private listByTransactionType(type: TransactionType): Transaction[] {
    return this.transactions.filter(q => q.type === type);
  }

  private totalByTransaction(type: TransactionType): number {
    const initialValue = 0;
    return this.listByTransactionType(type).reduce(
      (accumulator, transaction) => accumulator + transaction.value,
      initialValue,
    );
  }

  public getBalance(): Balance {
    // TODO
    const totalIncome = this.totalByTransaction(TransactionType.income);
    const totalOutcome = this.totalByTransaction(TransactionType.outcome);

    return {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    // TODO
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
