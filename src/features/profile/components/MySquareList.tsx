import type { SquareHistoryResponse } from '../types/profile.types';
import { MySquareCard } from './MySquareCard';

type Props = {
  post: SquareHistoryResponse[];
};
export const MySquareList = ({ post }: Props) => {
  // const navigate = useNavigate();
  console.log(post);

  return (
    <>
      {post.map((item) => {
        return <MySquareCard post={item} />;
      })}
    </>
  );
};
