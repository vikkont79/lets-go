import { Image } from '@/shared/ui'
import type { Trip } from '../../types'
import avatar from '@assets/images/avatar.jpg'
import styles from './TripCard.module.css'

interface TripCardProps {
  trip: Trip;
}

const TripCard = ({ trip }: TripCardProps) => {
  const avatarSrc = trip.user.avatar || avatar
  return (
    <article className={styles.card}>
      <Image
        className={styles.avatar}
        src={avatarSrc}
        alt={`Аватар ${trip.user.name}`}
        width={285}
        height={285}
        loading='lazy'
      />
      <div>
        <p className={styles.name}>{trip.user.name}</p>
        <p>{trip.tags}</p>
      </div>
      <div>
        <ul>
          {trip.countries.map(country => (
            <li key={country.code}>
              <p>{country.name_ru}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export { TripCard }
