import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
  const { amount, currency, redirect_url, paymentId } = req.body;
  if (!amount || !currency || !paymentId) {
    return res.status(400).json({ error: 'amount, currency et paymentId requis' });
  }
  try {
    const body: any = { amount, currency };
    if (redirect_url) body.redirect_url = redirect_url;
    const response = await axios({
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://merchant.revolut.com/api/orders',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.REVOLUT_API_KEY}`,
      },
      data: JSON.stringify(body)
    });
    // Met à jour le paiement Firestore avec le checkout_url et l'id Revolut
    const { checkout_url, id: revolut_payment_id } = response.data;
    if (!checkout_url || !revolut_payment_id) {
      return res.status(500).json({ error: "checkout_url ou id manquant dans la réponse Revolut" });
    }
    // Firestore update
    const { getFirestore, doc, updateDoc } = await import("firebase/firestore");
    const db = getFirestore();
    await updateDoc(doc(db, "payments", paymentId), {
      revolut_checkout_url: checkout_url,
      revolut_payment_id,
    });
    res.status(200).json({ checkout_url, revolut_payment_id });
  } catch (error: any) {
    res.status(error.response?.status || 500).json({ error: error.response?.data || error.message });
  }
}
