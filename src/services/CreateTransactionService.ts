import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import TransactionType from '../models/Enumerators';

interface RequestDTO {
  title: string;
  value: number;
  type: TransactionType;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    // TODO
    const transactionType = type.toLocaleLowerCase();

    if (!(transactionType in TransactionType)) {
      throw Error("Type invalid, only accepts 'income' or 'outcome'");
    }

    if (transactionType === TransactionType.outcome) {
      const balance = this.transactionsRepository.getBalance();

      if (balance.total === 0 || balance.total - value < 0) {
        throw Error("Don't have sufficient funds for this operation.");
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type: transactionType as TransactionType,
    });

    return transaction;
  }
}

export default CreateTransactionService;
