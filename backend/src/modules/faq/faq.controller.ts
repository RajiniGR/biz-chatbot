import { Request, Response } from "express";
import {
  createFAQ,
  getAllFAQs,
  updateFAQ,
  deleteFAQ,
} from "./faq.service";

export const getFAQs = async (_: Request, res: Response) => {
  const faqs = await getAllFAQs();
  res.status(200).json(faqs);
};

export const createFAQHandler = async (req: Request, res: Response) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ message: "Invalid payload" });
  }

  const faq = await createFAQ(question, answer);
  res.status(201).json(faq);
};

export const updateFAQHandler = async (req: Request, res: Response) => {
  const faq = await updateFAQ(
    req.params.id,
    req.body.question,
    req.body.answer
  );

  res.status(200).json(faq);
};

export const deleteFAQHandler = async (req: Request, res: Response) => {
  await deleteFAQ(req.params.id);
  res.status(200).json({ message: "FAQ deleted" });
};
