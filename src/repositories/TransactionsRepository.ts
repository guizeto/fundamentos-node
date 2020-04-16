import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.transactions.reduce(
      (acc: Balance, transaction: Transaction): Balance => {
        if (transaction.type === 'income') {
          acc.income += transaction.value;
        }

        if (transaction.type === 'outcome') {
          acc.outcome += transaction.value;
        }

        acc.total = acc.income - acc.outcome;
        return {
          income: acc.income,
          outcome: acc.outcome,
          total: acc.total,
        };
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
