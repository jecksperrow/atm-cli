import { Customer, Owe } from './interface';

let loggedIn: Customer | null = null;
let customers: Customer[] = [];
let owes: Owe[] = [];

/**
 * Find or Create owe
 * @param {Customer} customer
 * @param {Customer} owedTo
 * @returns {Owe}
 */
export const findOrCreateOwe = (customer: Customer, owedTo: Customer) => {
  let owe: Owe | undefined = owes.find((owe: Owe) => {
    return (owe.customer.name === customer.name && owe.owedTo.name === owedTo.name);
  });

  if (typeof owe === 'undefined') {
    owe = createOwe({
      customer,
      owedTo,
      amount: 0,
      status: 'going',
    });
  }

  return owe;
};

/**
 * find customer owes
 *
 * @param {Customer} customer
 * @returns {any}
 */
export const findCustomerOwes = (customer: Customer) => {
  return owes.filter((owe: Owe) => {
    return (owe.customer.name === customer.name || owe.owedTo.name === customer.name);
  });
};

/**
 * findCustomerOwedFrom
 *
 * @param {Customer} customer
 * @param {string} target
 * @returns {any}
 */
export const findCustomerOwedFrom = (customer: Customer, target: string) => {
  return owes.find((owe: Owe) => {
    return (owe.owedTo.name === customer.name && owe.customer.name === target);
  });
};

/**
 * createOwe
 *
 * @param {Owe} owe
 * @returns {Owe}
 */
export const createOwe = (owe: Owe) => {
  owes.push(owe);

  return owe;
};

/**
 * updateOwe
 *
 * @param {Owe} owed
 * @returns {Owe}
 */
export const updateOwe = (owed: Owe) => {
  owes = owes.map((owe: Owe) => {
    if (owe.customer.name === owed.customer.name && owe.owedTo.name === owed.owedTo.name) {
      return owed;
    }

    return owe;
  });

  return owed;
};

/**
 * findOrCreateCustomer
 *
 * @param {string} name
 * @returns {Customer}
 */
export const findOrCreateCustomer = (name: string) => {
  let customer: Customer | undefined = customers.find((arg: any) => {
    return arg.name === name;
  });

  if (typeof customer === 'undefined') {
    customer = createCustomer({
      name: name,
      balance: 0,
    });
  }

  return customer;
};

/**
 * findCustomer
 *
 * @param {string} name
 * @returns {null}
 */
export const findCustomer = (name: string) => {
  return customers.find((arg: any) => {
    return arg.name === name;
  }) || null;
};

/**
 * createCustomer
 *
 * @param {Customer} customer
 * @returns {Customer}
 */
export const createCustomer = (customer: Customer) => {
  customers.push(customer);

  return customer;
};

/**
 * setLoggedIn
 *
 * @param {Customer | null} customer
 */
export const setLoggedIn = (customer: Customer | null) => {
  loggedIn = customer ? {...customer} : null;
};

/**
 * getLoggedIn
 *
 * @returns {Customer | null}
 */
export const getLoggedIn = () => {
  return loggedIn;
};

/**
 * updateCustomer
 *
 * @param {string} name
 * @param {Customer} customer
 * @returns {Customer}
 */
export const updateCustomer = (name: string, customer: Customer) => {
  customers = customers.map((cust: Customer) => {
    if (cust.name === name) {
      return customer;
    }

    return cust;
  });

  if (loggedIn && loggedIn.name === name) {
    setLoggedIn(customer);
  }

  return customer;
};