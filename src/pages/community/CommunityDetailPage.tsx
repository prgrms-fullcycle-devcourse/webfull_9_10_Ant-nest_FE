import DiaryHeader from '@/components/common/DiaryHeader';
import DiaryQuestion from '@/components/common/DiaryQuestion';
import { useNavigate, useParams } from 'react-router-dom';
import PostDetailForm from '@/features/community/components/PostDetail/PostDetailForm';
import PostDetailBottomBar from '@/features/community/components/PostDetail/PostDetailBottomBar';
import { usePostDetail } from '@/features/community/hooks/usePostDetail';


export default function CommunityDetailPage() {
  // 사용할 때 useParams import 해오기
  const {id} = useParams();
  const navigate = useNavigate();

  const { data : post } = usePostDetail({
    postId : id ?? '',
  });


  const handleBack = () => {
    if (window.history.length > 1) {
      // 히스토리 있으면
      navigate(-1);
    } else {
      navigate('/community');
    }
  };

  if (!post || !id) return null;

  return (
    <div>
      <DiaryHeader onBack={handleBack} />
      <DiaryQuestion question={post.question} />
      <PostDetailForm post = {post}/>
      <PostDetailBottomBar 
        myReactionId={post.myReactionId} 
        postId={id} 
        empathyStats={post.empathyStats}
        totalEmpathyCount={post.totalEmpathyCount} 
      />
      <div className="h-[80px]" />
    </div>
  );
}
