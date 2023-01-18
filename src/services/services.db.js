import { db } from '../config/db';
import authQuery from '../api/queries/queries.auth';
import tripQuery from '../api/queries/queries.trip';

export const queries = {
  authQuery,
  tripQuery
};

export default {
  transact: (query, data, type) => db.any(queries[type][query], data),
  singleTransact: (query, data, type) => db.oneOrNone(queries[type][query], data),
  noReturnTransact: (query, data, type) => db.none(queries[type][query], data),
  multipleTransaction: transactions => {
    const result = db.tx(t => t.batch(transactions));
    return result;
  }
};
