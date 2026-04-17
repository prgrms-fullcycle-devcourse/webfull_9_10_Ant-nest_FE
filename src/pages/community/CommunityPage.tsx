import { CommunityHeader } from '@/features/community/components/Header/CommunityHeader';
import PostCard from '../../features/community/components/PostCard/PostCard';
import { FilterButton } from '@/features/community/components/Filter/EmotionFilterButton';
import { SortButton } from '@/features/community/components/Sorting/SortButton';
import FilterBottomSheet from '@/features/community/components/Filter/EmotionFilterBottomSheet';
import SortBottomSheet from '@/features/community/components/Sorting/SortBottomSheet';
import { useCommunityStore } from '@/store/communityStore';
import { usePosts } from '@/features/community/hooks/usePosts';
import { useState } from 'react';
import type { SortType } from '@/features/community/types/community.types';


export default function CommunityPage() {
  const activeBottomSheet = useCommunityStore((state) => state.activeBottomSheet);
  const activeTab = useCommunityStore((state) => state.selectedTab);
  const selectedEmotions = useCommunityStore((state) => state.selectedEmotions);

  const [sort, setSort] = useState<SortType | null>(null);
  const { data : posts } = usePosts(sort ?? undefined);

  // 감정 필터 전체 선택
  const isAllSelected =
    selectedEmotions.length === 0 ||
    selectedEmotions.length === 8;

  // 포스트 필터링
  const filteredPosts = posts?.filter((post) => {
    // 내글 탭이면 필터 안함
    if (activeTab === '내글') return post.isMine;

    // 전체 선택이면 전부 통과
    if (isAllSelected) return true;

    // 감정 필터 적용
    return (
      selectedEmotions.includes(post.emotion.type)
    );
  });
  
  return (
    <div>
      <div className="m-5"></div>
      <CommunityHeader></CommunityHeader>

      {
      activeTab === '전체' &&
      <div className="flex items-center justify-end gap-8 mr-4 mt-4">
        <FilterButton />
        <SortButton selectedSort= {sort}/>
      </div>
      }

      {filteredPosts?.map((post)=>
        <PostCard key={post.postId} post={post}></PostCard>
      )}
      
      {activeBottomSheet === 'sort' && <SortBottomSheet setSort={setSort} currentSort={sort}/>}
      {activeBottomSheet === 'filter' && <FilterBottomSheet />}
    </div>
  );
}
