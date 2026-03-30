import {motion} from 'motion/react'

export default function Loading() {
    // 꽃잎 개수(length) 반복을 위한 빈 배열
  const petals = Array.from({ length: 6 });

  return (
    <div className="flex items-center justify-center">
      <div className="relative h-24 w-24">
        {petals.map((_, index) => (
          <div
            key={index}
            // 부모(relative div)의 중앙으로 이동
            className="absolute left-1/2 top-1/2"
            // 각각의 요소 배치
            // translate(-50, -50) 모서리를 중심점에 / rotate 각각의 요소가 60도 간격으로 / translateY 중심기준 간격 띄우기  
            style={{
              transform: `
                translate(-50%, -50%)
                rotate(${index * 60}deg)
                translateY(-15px)
              `,
              transformOrigin: 'center center',
            }}
          >
          <motion.div
              className="size-5 rounded-full bg-[#ffe8e8] border border-[#ffb1b1]"
              initial={{
                opacity:0,
                scale: 0.2,
                backgroundColor: '#ffe8e8'
              }}
              animate={{
                opacity:[0, 1, 1, 1, 0],
                scale: [0.2, 1.08, 1, 1, 0.2],
                backgroundColor: ['#ffe8e8', '#ffcaca', '#ffb1b1', '#ffb1b1', '#ffcaca'],
              }}
              transition={{
                duration: 3.6,
                ease: 'easeInOut',
                repeat: Infinity,
                delay: index * 0.25,
              }}
            />
          </div>
        ))}
        <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FCDEC3] border border-amber-300" />
      </div>
    </div>
  );
}