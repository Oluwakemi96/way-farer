import { db } from '../config/db';
import authQuery from '../api/queries/queries.auth';
import adminQuery from '../api/queries/queries.admin';

export const queries = {
  authQuery,
  adminQuery
};

export default {
  transact: (query, data, type) => db.any(queries[type][query], data),
  singleTransact: (query, data, type) => db.oneOrNone(queries[type][query], data),
  noReturnTransact: (query, data, type) => db.none(queries[type][query], data)
};
