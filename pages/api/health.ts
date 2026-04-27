import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_request: NextApiRequest, response: NextApiResponse) {
  response.status(200).json({
    status: 'ok',
    service: "Param's Dental website",
    timestamp: new Date().toISOString(),
  });
}
