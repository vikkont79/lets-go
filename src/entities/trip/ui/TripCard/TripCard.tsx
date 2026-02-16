import { Button, Icon, IconButton, Image } from '@/shared/ui'
import type { Trip } from '../../types'
import avatar from '@assets/images/avatar.jpg'
import level from '@assets/images/card-level.svg'
import { TRANSPORT_OPTIONS } from '@/shared/constants'
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
      <div className={styles.user}>
        <p className={styles.name}>{trip.user.name}</p>
        <p className={styles.tags}>{trip.tags}</p>
        <div className={styles.actions}>
          <Button
            className={styles.call}
            to='#'
          >
            Позвать!
          </Button>
          <IconButton
            className={styles.likeButton}
            icon='heart'
            iconLabel='Избранное'
          />
          <span className={styles.likeQty}>{trip.user.likes || 0}</span>
        </div>
      </div>
      <div className={styles.options}>
        <ul className={styles.countries}>
          {trip.countries.map(country => (
            <li className={styles.country} key={country.code}>
              <img
                src={`https://cdn.jsdelivr.net/npm/flag-icons@6.6.6/flags/4x3/${country.code.toLowerCase()}.svg`}
                alt={country.name_ru}
                className={styles.flag}
                width={35}
                height={24}
                onError={(e) => {
                  // fallback: скрыть или поставить заглушку
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
              <span>{country.name_ru}</span>
            </li>
          ))}
        </ul>
        <ul className={styles.transport}>
          {TRANSPORT_OPTIONS.map(type => (
            <li key={type}>
              <Icon
                className={trip.transport.includes(type) ? styles.activeIcon : styles.icon}
                name={type}
              />
            </li>
          ))}
        </ul>
        <Image
          className={styles.level}
          src={level}
          alt='Уровень попутчика'
          width={60}
          height={60}
        />
      </div>
    </article>
  )
}

export { TripCard }
