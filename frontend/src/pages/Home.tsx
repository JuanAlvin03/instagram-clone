import React from 'react'
import Feed from '../components/Feed'
import Composer from '../components/Composer'

const Home: React.FC = () => {
  return (
    <div className="grid gap-4">
      <Composer />
      <Feed />
    </div>
  )
}

export default Home
