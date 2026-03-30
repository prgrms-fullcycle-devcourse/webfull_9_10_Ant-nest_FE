import React from 'react';
import { CommunityHeader } from "@/components/community/Header/CommunityHeader";
import PostCard from "../../components/community/PostCard/PostCard";
import { FilterButton } from "@/components/community/Filter/EmotionFilterButton";
import { SortButton } from '@/components/community/Sorting/SortButton';
import FilterBottomSheet from '@/components/community/Filter/EmotionFilterBottomSheet';
import SortBottomSheet from '@/components/community/Sorting/SortBottomSheet';
import { useCommunityStore } from '@/store/communityStore';
import type { Post } from './types';

// 목업 데이터
const mockPosts : Post[] = [
    {
    id: 1,
    question: '오늘 당신을 미소 짓게 만든 것은 무엇인가요?',
    answer: '떡볶이 먹고 너무 매워서 아이스크림까지 먹었음. 역시 맛있는 걸 먹는 게 인생의 행복이다. 진정한 행복이란 이런 순간에 있는 것 같다. 배는 부른데 마음은 더 먹고 싶다고 외치는 중.',
    isMine: true
    },
    {
    id: 2,
    question: '요즘 가장 자주 생각나는 사람은 누구인가요?',
    answer:
      '오랜만에 연락한 친구가 갑자기 “밥 먹었어?”라고 물어봐서 괜히 마음이 따뜻해졌다. 별거 아닌 말인데도 오랫동안 기억에 남을 것 같은 하루였다.',
    isMine: false
    },
    {
    id: 3,
    question: '오늘 하루 중 가장 길게 기억에 남은 순간은 언제였나요?',
    answer:
      '퇴근길 하늘이 생각보다 예뻐서 잠깐 멈춰 서서 봤다. 바쁜 날이었는데도 그 순간만큼은 아무 생각 없이 숨 돌릴 수 있어서 좋았다.',
    isMine: false
    },
];

export default function CommunityPage() {
  const activeBottomSheet = useCommunityStore((state)=>state.activeBottomSheet);
  const activeTab = useCommunityStore((state)=>state.selectedTab);

  return (
    <div>
      <CommunityHeader></CommunityHeader>

      <div className="flex items-center justify-end gap-8 mr-4 mt-4">
        <FilterButton />
        <SortButton selectedSort="최신순"/>
      </div>

      {/* 일단 map으로 구현 */}
      {
        activeTab === "전체" && mockPosts.map((post)=>{
          return <PostCard post={post}></PostCard>
        })
      }
      {
        activeTab === "내글" && 
        mockPosts
          .filter((post)=> post.isMine === true)
          .map((post)=>{
          return <PostCard post={post}></PostCard>
        })
      }

      {activeBottomSheet === "sort" && <SortBottomSheet/>}
      {activeBottomSheet === "filter" && <FilterBottomSheet/>}

    </div>
  );
}