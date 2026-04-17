import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReaction, deleteReaction } from "../api/community.api";
import type { Post } from "../types/community.types";

// 공감 버튼 처리
export const useReaction = () => {
    const queryClient = useQueryClient();

    // 낙관적 업데이트 공통 로직 (상세, 리스트)
    const updatePost = (
        post: Post,
        reactionId: number,
        isCancel: boolean
    ): Post => {
        let updatedStats = [...post.empathyStats];
        const prevReactionId = post.myReactionId;

        if (isCancel) {
        if (prevReactionId !== null) {
            updatedStats = updatedStats.map((s) =>
            Number(s.typeId) === Number(prevReactionId)
                ? { ...s, count: Math.max(0, s.count - 1) }
                : s
            );
        }
        } else {
        if (prevReactionId !== null) {
            updatedStats = updatedStats.map((s) =>
            Number(s.typeId) === Number(prevReactionId)
                ? { ...s, count: Math.max(0, s.count - 1) }
                : s
            );
        }

        updatedStats = updatedStats.map((s) =>
            Number(s.typeId) === reactionId
            ? { ...s, count: s.count + 1 }
            : s
        );
        }
        // 총 공감수
        const totalScore = updatedStats.reduce(
        (acc, s) => acc + s.count,
        0
        );

        return {
        ...post,
        myReactionId: isCancel ? null : reactionId,
        empathyStats: updatedStats,
        totalEmpathyCount: totalScore,
        };
    };


    // useMutation
    return useMutation({
        mutationFn: ({
            postId,
            reactionId,
            isCancel,
        }: {
            postId: string;
            reactionId: number;
            isCancel: boolean;
    }) => {
        return isCancel
            ? deleteReaction(postId)
            : addReaction(postId, reactionId);
        },

    // 낙관적 업데이트 (리스트 + 상세 둘 다)
    onMutate: async ({ postId, reactionId, isCancel }) => {
    // 리스트 업데이트
    queryClient.setQueriesData(
        { queryKey: ["posts"] },
        (old: Post[] | undefined) => {
        if (!old) return old;

        return old.map((post) =>
            post.postId === postId
            ? updatePost(post, reactionId, isCancel)
            : post
        );
        }
    );
    // 상세 업데이트
    queryClient.setQueryData(
        ["postDetail", postId],
        (old: Post | undefined) => {
        if (!old) return old;

        return updatePost(old, reactionId, isCancel);
        }
    );
    },

    // 실패 시 서버 기준으로 복구
    onError: () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
    queryClient.invalidateQueries({ queryKey: ["postDetail"] });
    },
});
};
