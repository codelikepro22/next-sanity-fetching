import { sanityClient } from '../../../utils/sanity/client';

const handler = async (req, res) => {
  try {
    const data = await sanityClient.fetch('*[_type=="user"]');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Something went Wrong!' });
  }
};

export default handler;
