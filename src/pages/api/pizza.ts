import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const pizzaNames = [
  "Margherita",
  "Marinara",
  "Quattro Stagioni",
  "Carbonara",
  "Frutti di Mare",
  "Quattro Formaggi",
  "Crudo",
  "Napoletana or Napoli",
];

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const randomPizzaName =
    pizzaNames[Math.floor(Math.random() * pizzaNames.length)];

  setTimeout(
    () => {
      res.status(200).json({ name: randomPizzaName });
    },
    // NOTE: artificial delay to see the difference easier
    2000
  );
}
