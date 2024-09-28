'use client'
import Image from 'next/image'
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'
import maleFemale from '@/src/app/assets/maleFemale.png'
import moreDark from '@/src/app/assets/moreDark.png'

const data = [
  {
    name: 'Total',
    count: 106,
    fill: 'white'
  },
  {
    name: 'Girls',
    count: 53,
    fill: '#FAE27C'
  },
  {
    name: 'Boys',
    count: 53,
    fill: '#C3EBFA'
  }
]

const CountChart = () => {
  return (
    <div className='bg-white rounded-xl w-full h-full p-4 dark:bg-slate-800 dark:text-white dark:shadow-2xl'>
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-semibold'>Students</h1>
        <Image src={moreDark} alt='' width={20} height={20} />
      </div>
      <div className='relative w-full h-[75%]'>
        <ResponsiveContainer>
          <RadialBarChart cx='50%' cy='50%' innerRadius='40%' outerRadius='100%' barSize={32} data={data}>
            <RadialBar background dataKey='count' />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src={maleFemale}
          alt=''
          width={50}
          height={50}
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        />
      </div>
      <div className='flex justify-center gap-16'>
        <div className='flex flex-col gap-1'>
          <div className='w-5 h-5 bg-lamaSky rounded-full' />
          <h1 className='font-bold'>1,234</h1>
          <h2 className='text-xs text-gray-300'>Boys (55%)</h2>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='w-5 h-5 bg-lamaYellow rounded-full' />
          <h1 className='font-bold'>1,234</h1>
          <h2 className='text-xs text-gray-300'>Girls (45%)</h2>
        </div>
      </div>
    </div>
  )
}

export default CountChart
