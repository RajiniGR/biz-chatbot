import { Request, Response } from "express";
import { FAQ } from "../chat/faq.model";

export async function createFAQ(req: Request, res: Response) {
  const faq = await FAQ.create(req.body);
  res.status(201).json(faq);
}

export async function getFAQs(_req: Request, res: Response) {
  const faqs = await FAQ.find();
  res.json(faqs);
}

export async function updateFAQ(req: Request, res: Response) {
  const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(faq);
}

export async function deleteFAQ(req: Request, res: Response) {
  await FAQ.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
}
