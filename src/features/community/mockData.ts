// import type { CommunityPostDetail, Post } from "./types/community.types";

// export const mockPosts: Post[] = [
//     {
//         postId: "1",
//         title: "오늘 당신을 미소 짓게 만든 것은 무엇인가요?",
//         content: "완전 완전 맛있는 밥을 먹었음",
//         emotion: {
//             type: "JOY",
//             name: 'joy',
//         },
//         isMine: true,
//         totalScore: 5,
//         empathyStats: [
//         { typeId: "1", name: "기뻐요", count: 2 },
//         { typeId: "2", name: "설레요", count: 3 },
//         { typeId: "3", name: "슬퍼요", count: 0 },
//         { typeId: "4", name: "화나요", count: 0 },
//         { typeId: "5", name: "황당해요", count: 0 },
//         ],
//         myReactionId: null,
//     },
//     {
//         postId: "2",
//         title: "요즘 가장 자주 생각나는 사람은 누구인가요?",
//         content:
//         "오랜만에 연락한 친구가 갑자기 밥 먹었어?라고 물어봐서 괜히 마음이 따뜻해졌다.",
//         emotionEmoji: {
//             id: "2",
//             label: 'heart',
//         },
//         isMine: false,
//         totalScore: 7,
//         empathyStats: [
//         { typeId: "1", name: "기뻐요", count: 5 },
//         { typeId:"2", name: "설레요", count: 2 },
//         { typeId: "3", name: "슬퍼요", count: 0 },
//         { typeId: "4", name: "화나요", count: 0 },
//         { typeId: "5", name: "황당해요", count: 0 },
//         ],
//         myReactionId: "2",
//     },
//     {
//         postId: "3",
//         title: "오늘 하루 중 가장 기억에 남은 순간은?",
//         content:
//         "퇴근길 하늘이 예뻐서 잠깐 멈춰서 봤다. 그 순간이 좋았다.",
//         emotionEmoji: {
//             id: "1",
//             label: 'joy',
//         },
//         isMine: false,
//         totalScore: 12,
//         empathyStats: [
//         { typeId: "1", name: "기뻐요", count: 3 },
//         { typeId: "2", name: "설레요", count: 9 },
//         { typeId: "3", name: "슬퍼요", count: 0 },
//         { typeId: "4", name: "화나요", count: 0 },
//         { typeId: "5", name: "황당해요", count: 0 },
//         ],
//         myReactionId: null,
//     },
// ];

// export const mockPostDetail: CommunityPostDetail[] = [
//         {
//         postId: "1",
//         title: "오늘 당신을 미소 짓게 만든 것은 무엇인가요?",
//         content: "완전 완전 맛있는 밥을 먹었음",
//         diaryDate: "2026-04-14",
//         createdAt: "2026-04-14T10:00:00",
//         updatedAt: null,
//         emotion: {
//         type: "JOY",
//         name: "joy",
//         },
//         question: "오늘 당신을 미소 짓게 만든 것은 무엇인가요?",
//         photos: [
//         {
//             photoId: "p1",
//             imageUrl: "https://picsum.photos/300/300?1",
//             displayOrder: 1,
//         },
//         {
//             photoId: "p2",
//             imageUrl: "https://picsum.photos/300/300?2",
//             displayOrder: 2,
//         },
//         ],
//         empathyStats: [
//         { typeId: "1", name: "기뻐요", count: 2 },
//         { typeId: "2", name: "설레요", count: 3 },
//         { typeId: "3", name: "슬퍼요", count: 0 },
//         { typeId: "4", name: "화나요", count: 0 },
//         { typeId: "5", name: "황당해요", count: 0 },
//         ],
//         myReactionId: null,
//     },

//     {
//         postId: "2",
//         title: "요즘 가장 자주 생각나는 사람은 누구인가요?",
//         content:
//         "오랜만에 연락한 친구가 갑자기 밥 먹었어?라고 물어봐서 괜히 마음이 따뜻해졌다.",
//         diaryDate: "2026-04-14",
//         createdAt: "2026-04-14T11:00:00",
//         updatedAt: null,
//         emotion: {
//         type: "HEART",
//         name: "heart",
//         },
//         question: "요즘 가장 자주 생각나는 사람은 누구인가요?",
//         photos: [
//         {
//             photoId: "p3",
//             imageUrl: "https://picsum.photos/300/300?3",
//             displayOrder: 1,
//         },
//         ],
//         empathyStats: [
//         { typeId: "1", name: "기뻐요", count: 5 },
//         { typeId: "2", name: "설레요", count: 2 },
//         { typeId: "3", name: "슬퍼요", count: 0 },
//         { typeId: "4", name: "화나요", count: 0 },
//         { typeId: "5", name: "황당해요", count: 0 },
//         ],
//         myReactionId: null,
//     },

//     {
//         postId: "3",
//         title: "오늘 하루 중 가장 기억에 남은 순간은?",
//         content: "퇴근길 하늘이 예뻐서 잠깐 멈춰서 봤다. 그 순간이 좋았다.",
//         diaryDate: "2026-04-14",
//         createdAt: "2026-04-14T12:00:00",
//         updatedAt: null,
//         emotion: {
//         type: "JOY",
//         name: "joy",
//         },
//         question: "오늘 하루 중 가장 기억에 남은 순간은?",
//         photos: [],
//         empathyStats: [
//         { typeId: "1", name: "기뻐요", count: 3 },
//         { typeId: "2", name: "설레요", count: 9 },
//         { typeId: "3", name: "슬퍼요", count: 0 },
//         { typeId: "4", name: "화나요", count: 0 },
//         { typeId: "5", name: "황당해요", count: 0 },
//         ],
//         myReactionId: null,
//     },
// ] 