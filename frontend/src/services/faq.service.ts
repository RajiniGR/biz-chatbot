import api from "./api";

export const getFAQs = () => api.get("/faq");

export const createFAQ = (payload: {
  question: string;
  answer: string;
}) => api.post("/faq", payload);

export const updateFAQ = (
  id: string,
  payload: { question: string; answer: string }
) => api.put(`/faq/${id}`, payload);

export const deleteFAQ = (id: string) =>
  api.delete(`/faq/${id}`);
