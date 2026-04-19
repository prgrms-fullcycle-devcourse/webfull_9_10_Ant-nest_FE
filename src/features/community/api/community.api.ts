import api from '@/lib/api'
import type { CommunityPostDetail, Post, SortType } from '../types/community.types';
import type { ApiResponse } from '@/types/index.types';

// 게시글 조회
export const fetchPosts = async (sort?: SortType): Promise<Post[]> => {
    const res = await api.get<ApiResponse<Post[]>>('/square/posts', {
    params: sort ? { sort } : undefined,
    });

    return res.data.data.map((post) => ({
    ...post,
    myReactionId: post.myReactionId
        ? Number(post.myReactionId)
        : null,
    }));
};

// 게시글 상세 조회
export const fetchPostDetail = async (postId: string): Promise<CommunityPostDetail> => {
    const res = await api.get<ApiResponse<CommunityPostDetail>>(`/square/posts/${postId}`);

    let data = res.data.data
    return data = {
    ...data,
    myReactionId: data.myReactionId
        ? Number(data.myReactionId)
        : null,
    };
};


// 공감 요청
type ReactionResponse = {
    action: 'CREATED' | 'UPDATED';
    currentScore: number;
    };

export const addReaction = async (
    postId: string,
    empathyTypeId: number
    ): Promise<ReactionResponse> => {
    const res = await api.post(`/square/posts/${postId}/empathies`, {
        empathyTypeId,
    });

    return res.data;
};


// 공감 취소
export const deleteReaction = async (
    postId: string
    ): Promise<ReactionResponse> => {
    const res = await api.delete(`/square/posts/${Number(postId)}/empathies`);

    return res.data;
};