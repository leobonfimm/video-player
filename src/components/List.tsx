import videos from '../../videos.json'
import { VideoCard } from './VideoCard'

import styles from './List.module.css'

export function List() {
  return (
    <aside className={styles.container}>
      {videos.map((video) => (
        <div key={video.id}>
          <VideoCard title={video.title} thumbnail={video.thumbnail} />
        </div>
      ))}
    </aside>
  )
}