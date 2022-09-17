import { sanityClient } from '../../../utils/sanity/client';
import Link from 'next/link';

const Products = ({ products }) => {
  return (
    <div>
      {products.map((product) => (
        <Link href={`/product/ssg/${product.slug}`} key={product._id}>
          <a>
            <p>{product.title}</p>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Products;

export const getStaticProps = async () => {
  const products = await sanityClient.fetch(
    '*[_type=="product" && defined(slug.current) && !(_id in path("drafts.**"))]{..., "slug":slug.current}'
  );
  return {
    props: { products },
    revalidate: 10,
  };
};
