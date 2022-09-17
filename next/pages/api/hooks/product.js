import { SIGNATURE_HEADER_NAME, isValidSignature } from '@sanity/webhook';

const handler = async (req, res) => {
  try {
    const signature = req.headers[SIGNATURE_HEADER_NAME].toString();
    if (
      !isValidSignature(
        JSON.stringify(req.body),
        signature,
        process.env.SANITY_WEBHOOK_SECRET
      )
    )
      return res.status(401).json({ msg: 'Invalid request!' });
    const { slug } = req.body;
    await res.revalidate(`/product/isr/${slug}`);
    await res.revalidate(`/product/isr/`);
    console.log('slug:', slug);
    res.status(200).json({ msg: 'Product pages revalidated.' });
  } catch (error) {
    res.status(200).json({ err: 'Something went Wrong!' });
  }
};

export default handler;
