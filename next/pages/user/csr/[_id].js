import useSWR from 'swr';
import { useRouter } from 'next/router';

const User = () => {
  const router = useRouter();
  const { _id } = router.query;
  const { data: user, error } = useSWR(_id ? `/api/user/${_id}` : null, (url) =>
    fetch(url).then((res) => res.json())
  );
  return <div>{user && <p>{user.name}</p>}</div>;
};

export default User;
