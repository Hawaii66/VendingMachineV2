import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  spin: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.json({
    spin: -1,
  });
}
