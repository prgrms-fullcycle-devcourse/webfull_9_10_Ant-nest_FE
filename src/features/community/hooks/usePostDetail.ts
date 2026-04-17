import { useQuery } from '@tanstack/react-query';
import { fetchPostDetail } from '@/features/community/api/community.api';

// 포스트 데이터 가져오기
export const usePostDetail = ({postId}:{postId : string}) => {
    return useQuery({
        queryKey: ['postDetail', postId],
        queryFn: ()=>fetchPostDetail(postId),
        enabled: !!postId,
    });
    };

    