import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import reactionToggle from '@/assets/images/emotions/emotion-blank.png'
import edit from '../../../../assets/images/icons/edit.svg'
import {ReactionEmojisToggle} from './PostCardReactionToggle'
import type { Post } from '@/features/community/types/community.types';
import { Button } from '@radix-ui/themes';
import { EMOTIONS } from '@/constants/emotions';
import PostCardReaction from './PostCardReaction';
import { useReaction } from '../../hooks/useReaction';


const PostCard = ( {post} : {post:Post})=>{
  const { postId, diaryId, title, isMine, question, totalEmpathyCount, empathyStats, myReactionId, emotion, sharedAtRelative} = post;
  // 리액션 토글 스위치
  const [showReactions, setShowReactions] = useState<true|false>(false);

  const navigate = useNavigate();

  const { mutate } = useReaction();

  const handleReaction = (reactionId: number, isCancel: boolean) => {
    mutate({
      postId: post.postId,
      reactionId,
      isCancel,
    });
  };


  return (
    <article className={`min-h-[18rem] rounded-2xl p-4 pb-0 shadow-[var(--shadow-middle)] m-4 mt-6 
      ${isMine === true ? 'bg-[#FCFCF4]' : 'bg-white'}`}>
      
      <div className="mb-3 flex items-start gap-2">
        <img 
          src={EMOTIONS[emotion.type].emo} 
          className="h-12 w-12 p-1"
          alt={EMOTIONS[emotion.type].label}/>
        <div className="mb-3 inline-flex flex-col">
          <span className="flex rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-medium text-[var(--color-white)]">
            익명의 달래
          </span>
          <span className="mt-2 text-xs text-gray-400">{sharedAtRelative}</span>
        </div>

        {
          isMine === true &&
          <div className='mt-1 ml-auto flex items-center gap-2.5 scale-110'>
              <a onClick={()=>navigate(`/diary/${diaryId}`)}>
                <img src={edit}></img>
              </a>
          </div>  
        }
      </div>

      <div className="bg-[#FFF] mb-2 rounded-2xl border border-[#F1F1F1] shadow-[var(--shadow-middle)]">
        <h3 className="m-2 text-sm font-semibold text-[var(--color-text-default)]">
          Q. {question}
        </h3>
      </div>

      <div className='bg-[#FAFAFA] p-2 mb-2 rounded-2xl border border-[#F1F1F1] shadow-[var(--shadow-middle)]'>
        <p className="line-clamp-2 min-h-[2.5rem] text-sm leading-5.5 text-[var(--color-text-default)]">
          {title}
        </p>

        <div className="flex justify-end">
          <a
            className="!text-sm !text-gray-400"
            onClick={()=>navigate(`/community/${postId}`)}
          >상세보기</a>
        </div>
      </div>

      {/* 감정 버튼 영역 */}
      <div className="relative mt-4 flex items-start justify-end">

        {showReactions 
          ? <ReactionEmojisToggle 
              onClose={() => setShowReactions(false)} 
              handleReaction = {handleReaction}
              myReactionId = {myReactionId}        
              /> 
          : <PostCardReaction 
              empathyStats={empathyStats}
              myReactionId = {myReactionId}   
              />}

        <div className='flex flex-col items-center'>
          {/* 버튼 클릭 시 감정 버튼들 나옴 */}
          <Button
            variant='ghost'
            onClick={() => setShowReactions((prev) => !prev)}
          >
            <img 
              src= {reactionToggle}             
              className='h-8 w-8'
            />
          </Button>
          <p className='text-xs text-[var(--color-text-default)] mt-0.5'>{totalEmpathyCount}</p>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
