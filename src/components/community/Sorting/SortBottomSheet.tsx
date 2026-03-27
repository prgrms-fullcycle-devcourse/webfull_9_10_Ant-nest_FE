import { useCommunityStore } from '@/store/communityStore';
import React from 'react'


const SortBottomSheet = () => {
  const activeBottomSheet = useCommunityStore((state)=>state.activeBottomSheet);
  const setActiveBottomSheet = useCommunityStore((state)=>state.setActiveBottomSheet);
  return (
    <div>
        <div className="fixed inset-0 z-50 bg-black/25"
            onClick={()=>activeBottomSheet==="sort"&&setActiveBottomSheet(null)}>
            <div className="absolute bottom-0 left-0 w-full h-55 rounded-t-2xl bg-white p-5 pr-6"
                onClick={(e) => e.stopPropagation()}>
                <div className='flex justify-end'>
                <button className='text-[var(--color-primary)] text-[15px] font-medium'>
                  적용
                </button>
                </div>

                <div className='mt-2 gap-9 flex flex-col text-base font-medium text-[var(--color-text-default)]'>
                  <button>
                    최신순
                  </button>
                  <button>
                    오래된순
                  </button>
                  <button>
                    공감많은순
                  </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SortBottomSheet;