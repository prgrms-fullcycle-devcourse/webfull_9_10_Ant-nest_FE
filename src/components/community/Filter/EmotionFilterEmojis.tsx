import type { Emojis } from '@/pages/community/types'
import React from 'react'


type filterEmojisProps = {
  filterEmojis : Emojis[];
}

const EmotionFilterEmojis = ({filterEmojis} : filterEmojisProps) => {
  return (
    <div className='mt-8 grid grid-cols-4 gap-y-7 justify-items-center'>
      {filterEmojis.map((emoji)=>
        <img src={emoji.url} className='h-14 w-14'></img>
      )}
    </div>
  )
}

export default EmotionFilterEmojis
