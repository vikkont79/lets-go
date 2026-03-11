import { IconButton } from '../IconButton/IconButton';
import { useState } from 'react';
import styles from './Accordion.module.css';
import { useMediaQuery } from '@/shared/lib';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Accordion = ({
  title,
  children,
  id,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isTablet = useMediaQuery('(max-width: 769px)');

  return (
    <>
      <IconButton
        icon='open-popup'
        iconSize={10}
        iconPosition='right'
        variant='transparent'
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-labelledby={id}
      >
        {title}
      </IconButton>

      {(isTablet || isOpen) && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </>
  )
}

export { Accordion };
