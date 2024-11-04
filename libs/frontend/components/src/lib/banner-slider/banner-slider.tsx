import { Box } from '@mui/material';
import React from 'react';
import styles from './banner-slider.module.scss';
import { Link } from 'react-router-dom';
import { useDebounce } from '@frontend/hooks';
/* eslint-disable-next-line */
export interface BannerSliderProps {
  data: Array<any>;
  bannerWidth?: string;
  bannerHeight?: string;
  itemWidth?: string;
  itemHeight?: string;
  autoplay?: boolean;
  duration?: number;
  itemStartPosition?: string;
  mouseOverPause?: boolean;
  disableNavigation?: boolean;
}

export function BannerSlider(props: BannerSliderProps) {
  const slideRef = React.useRef<HTMLDivElement>(null);
  const autoplayInterval = React.useRef<NodeJS.Timeout | null>(null);

  const handleNextSlide = () => {
    if (slideRef.current) {
      const items = slideRef.current.querySelectorAll('.slide__item');
      slideRef.current.appendChild(items[0]);
    }
  };

  const handlePrevSlide = () => {
    if (slideRef.current) {
      const items = slideRef.current.querySelectorAll('.slide__item');
      slideRef.current.insertBefore(items[items.length - 1], items[0]);
    }
  };

  React.useEffect(() => {
    if (props.autoplay) {
      autoplayInterval.current = setInterval(() => {
        handleNextSlide();
      }, props.duration || 3000);

      return () => {
        if (autoplayInterval.current) {
          clearInterval(autoplayInterval.current);
        }
      };
    }
  }, [props.autoplay, props.duration]);

  const handleMouseEnter = () => {
    if (props.mouseOverPause && autoplayInterval.current) {
      clearInterval(autoplayInterval.current);
    }
  };

  const handleMouseLeave = () => {
    if (props.mouseOverPause && props.autoplay) {
      autoplayInterval.current = setInterval(() => {
        handleNextSlide();
      }, props.duration || 3000);
    }
  };

  return (
    <Box
      className={styles['container']}
      style={{
        width: props.bannerWidth ?? '100%',
        height: props.bannerHeight ?? '800px',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        className={styles['slide']}
        ref={slideRef}
        sx={{
          '& .slide__item': {
            '&:nth-child(1), &:nth-child(2)': {
              top: 0,
              left: 0,
              transform: 'translate(0, 0)',
              borderRadius: 0,
              width: '100%',
              height: '100%',
            },
            '&:nth-child(3)': {
              left: props.itemStartPosition ?? '50%',
            },
            '&:nth-child(4)': {
              left: `calc(${props.itemStartPosition ?? '50%'} + ${
                props.itemWidth
              } + ${'40px'})`,
            },
            '&:nth-child(5)': {
              left: `calc(${props.itemStartPosition ?? '50%'} + 2 * (${
                props.itemWidth
              } + ${'40px'}))`,
            },
            '&:nth-child(6)': {
              left: `calc(${props.itemStartPosition ?? '50%'} + 3 * (${
                props.itemWidth
              } + ${'40px'}))`,
              opacity: 0,
            },
          },
        }}
      >
        {props.data.map((item, index) => (
          <Box
            key={index}
            className={`${styles['slide__item']} slide__item`}
            sx={{
              backgroundImage: `url(${item.image})`,
            }}
          >
            <Box className={styles['slide__item__content']}>
              <Box className={styles['slide__item__content__title']}>
                {item.title}
              </Box>
              <Box className={styles['slide__item__content__description']}>
                {item.description}
              </Box>
              {item.link && (
                <Link
                  to={item.link}
                  className={styles['slide__item__content__btn']}
                >
                  See more
                </Link>
              )}
            </Box>
          </Box>
        ))}
      </Box>
      {!props.disableNavigation && (
        <Box className={styles['actions']}>
          <button
            className={`${styles['actions__btn']} ${styles['actions__btn--prev']}`}
            onClick={handlePrevSlide}
          >
            P
          </button>
          <button
            className={`${styles['actions__btn']} ${styles['actions__btn--next']}`}
            onClick={handleNextSlide}
          >
            N
          </button>
        </Box>
      )}
    </Box>
  );
}

export default BannerSlider;