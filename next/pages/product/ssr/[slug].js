import { sanityClient } from '../../../utils/sanity/client';
import Link from 'next/link';

const Product = ({ product }) => {
  return (
    <div>
      <p>{product.title}</p>
    </div>
  );
};

export default Product;

export const getServerSideProps = async (context) => {
  const { slug } = context.params;
  const product = await sanityClient.fetch(
    '*[_type=="product" && defined(slug.current) && !(_id in path("drafts.**")) && slug.current == $slug][0]{..., "slug":slug.current}',
    { slug }
  );
  return {
    props: { product },
  };
};
