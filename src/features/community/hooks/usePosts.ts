import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '@/features/community/api/community.api';
import type { Post, SortType } from '../types/community.types';

// 포스트 데이터 가져오기
export const usePosts = (sort?: SortType) => {
    return useQuery<Post[]>({
        queryKey: sort ? ['posts', sort] : ['posts'],
        queryFn: () => fetchPosts(sort),
    });
};