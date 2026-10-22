import { handleApiRequest } from '../../src/server/apiHandler.js';

export default async function handler(req, res) {
  return handleApiRequest(req, res);
}
