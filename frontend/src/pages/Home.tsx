import React from 'react'
import Feed from '../components/Feed'

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full max-w-xl mx-auto gap-4">
      <Feed />
    </div>
  )
}

export default Home
