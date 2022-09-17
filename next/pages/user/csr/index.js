import Link from 'next/link';
import useSWR from 'swr';

const Users = () => {
  const { data, error } = useSWR('/api/user/', (url) =>
    fetch(url).then((res) => res.json())
  );
  return (
    <div>
      {data
        ? data.map((user) => (
            <Link href={`/user/csr/${user._id}`} key={user._id}>
              <a>
                <p>{user.name}</p>
              </a>
            </Link>
          ))
        : 'Loading...'}
    </div>
  );
};

export default Users;
