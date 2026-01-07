import { FAQ } from "./faq.model";

export const createFAQ = async (question: string, answer: string) => {
  return FAQ.create({ question, answer });
};

export const getAllFAQs = async () => {
  return FAQ.find().sort({ createdAt: -1 });
};

export const updateFAQ = async (
  id: string,
  question: string,
  answer: string
) => {
  return FAQ.findByIdAndUpdate(
    id,
    { question, answer },
    { new: true }
  );
};

export const deleteFAQ = async (id: string) => {
  return FAQ.findByIdAndDelete(id);
};
