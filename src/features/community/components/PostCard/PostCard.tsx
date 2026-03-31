import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import joy from '../../../../assets/images/emotions/illu-happy.png'
import heart from '../../../../assets/images/emotions/emotion-excited.png'
import panic from '../../../../assets/images/emotions/emotion-absurd.png'
import sad from '../../../../assets/images/emotions/emotion-depressed.png'
import angry from '../../../../assets/images/emotions/emotion-angry.png'
import normal from '../../../../assets/images/emotions/illu-default.png'
import gross from '../../../../assets/images/emotions/emotion-disgusted.png'
import tired from '../../../../assets/images/emotions/emotion-tired.png'

import reactionToggle from '../../../../assets/images/icons/community-reaction-icons.png'
import trashCan from '../../../../assets/images/icons/trashcan.svg'
import edit from '../../../../assets/images/icons/edit.svg'
import {ReactionEmojisToggle} from './PostCardReactionToggle'
import type { Emojis, Post } from '@/features/community/types/community.types';
import { Button } from '@radix-ui/themes';

// 프로필 이모지
const profileEmojis : Emojis[] = [
  { id: 1, name: 'joy', url: joy },
  { id: 2, name: 'heart', url: heart },
  { id: 3, name: 'panic', url: panic },
  { id: 4, name: 'sad', url: sad },
  { id: 5, name: 'angry', url: angry },
  { id: 6, name: 'normal', url: normal },
  { id: 7, name: 'gross', url: gross },
  { id: 8, name: 'tired', url: tired },
];

// 공감 이모지
const reactionEmojis : Emojis[] = [
  { id: 1, name: '기뻐요', url: joy },
  { id: 2, name: '설레요', url: heart },
  { id: 3, name: '슬퍼요', url: sad },
  { id: 4, name: '화나요', url: angry },
  { id: 5, name: '황당해요', url: panic },
];

const PostCard = ( {post} : {post:Post})=>{
  const {id, question, answer, isMine} = post;
  const [showReactions, setShowReactions] = useState<true|false>(false);
  const navigate = useNavigate();

  return (
    <article className={`min-h-[300px] rounded-2xl p-4 shadow-[var(--shadow-middle)] m-4 
      ${isMine === true ? 'bg-[#FCFCF4]' : 'bg-white'}`}>
      
      <div className="mb-3 flex items-start gap-2">
        <img src={profileEmojis[0].url} className="h-12 w-12 p-1"/>
        <div className="mb-3 inline-flex flex-col">
          <span className="flex rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-medium text-[var(--color-white)]">
            익명의 달래
          </span>
          <span className="mt-2 text-xs text-gray-400">2시간전</span>
        </div>

        {
          isMine === true &&
          <div className='mt-1 ml-auto flex items-center gap-2.5 scale-110'>
              <a onClick={()=>navigate(`/diary/${id}`)}>
                <img src={edit}></img>
              </a>
              <Button
                variant='ghost'
                >
                <img src={trashCan}></img>
              </Button>
          </div>  
        }
      </div>

      <div className="bg-[#FFF] mb-2 rounded-2xl border border-[#F1F1F1] shadow-[var(--shadow-middle)]">
        <h3 className="m-2 text-sm font-semibold text-[var(--color-text-default)]">
          Q. {question}
        </h3>
      </div>

      <div className='bg-[#FAFAFA] p-2 mb-2 rounded-2xl border border-[#F1F1F1] shadow-[var(--shadow-middle)]'>
        <p className="line-clamp-2 text-sm leading-6 text-[var(--color-text-default)]">
          {answer}
        </p>

        <div className="mt-1 flex justify-end">

          <a
            className="!text-sm !text-gray-400"
            onClick={()=>navigate(`/community/${id}`)}
          >상세보기</a>
        </div>
      </div>

      {/* 감정 버튼 영역 */}
      <div className="relative mt-3 flex items-start justify-end">
        {showReactions && <ReactionEmojisToggle reactionEmojis={reactionEmojis}/>}

        {/* 버튼 클릭 시 감정 버튼들 나옴 */}
        <Button
          variant='ghost'
          onClick={() => setShowReactions((prev) => !prev)}
        >
          <img src={reactionToggle} className='h-8 w-8'/>
        </Button>
        <p className='text-s ml-2 text-[var(--color-text-default)] mt-1'>7</p>
      </div>
    </article>
  );
};

export default PostCard;
