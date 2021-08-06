import { Customer, Owe } from './interface';
import { findCustomerOwes, updateCustomer, updateOwe } from './store';

/**
 * addBalance
 *
 * @param {Customer} customer
 * @param {number} amount
 * @returns {Customer}
 */
export const addBalance = (customer: Customer, amount: number) => {
  const balance = customer.balance + amount;
  customer = {...customer, balance};

  return updateCustomer(customer.name, customer);
};

/**
 * deductBalance
 *
 * @param {Customer} customer
 * @param {number} amount
 * @returns {Customer}
 */
export const deductBalance = (customer: Customer, amount: number) => {
  const balance = customer.balance - amount;
  customer = {...customer, balance};

  return updateCustomer(customer.name, customer);
};

/**
 * addOwe
 *
 * @param {Owe} owe
 * @param {number} amount
 * @returns {Owe}
 */
export const addOwe = (owe: Owe, amount: number) => {
  owe = {
    ...owe,
    amount: owe.amount + amount,
    status: 'going'
  };

  return updateOwe(owe);
};

/**
 * deductowe
 *
 * @param {Owe} owe
 * @param {number} amount
 * @returns {Owe}
 */
export const deductowe = (owe: Owe, amount: number) => {
  amount = owe.amount - amount;

  owe = {
    ...owe,
    amount: amount,
    status: (amount === 0) ? 'done' : 'going'
  };

  return updateOwe(owe);
};

/**
 * showBalance
 *
 * @param {Customer} customer
 */
export const showBalance = (customer: Customer) => {
  console.info(`Your balance is $${customer.balance}`);
  showOwes(customer);
};

/**
 * showOwes
 *
 * @param {Customer} customer
 */
export const showOwes = (customer: Customer) => {
  const owes = findCustomerOwes(customer);

  owes.forEach((owe: Owe) => {
    if (owe.status === 'going') {
      if (customer.name === owe.customer.name) {
        console.info(`Owed $${owe.amount} to ${owe.owedTo.name}`);
      } else {
        console.info(`Owed $${owe.amount} from ${owe.customer.name}`);
      }
    }
  });
};