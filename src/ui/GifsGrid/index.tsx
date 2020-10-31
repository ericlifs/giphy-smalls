import React, { useMemo } from 'react';
import { Gif } from '../../interfaces/gifs';
import FavButton from '../FavButton';
import LoadingSpinner from '../LoadingSpinner';
import './index.scss';

interface GifsGridProps {
  title: string;
  loading: boolean;
  gifs: Gif[];
}

const GifsGrid: React.FC<GifsGridProps> = (props: GifsGridProps) => {
  const GifsGridContent = useMemo(() => {
    if (props.loading) {
      return <LoadingSpinner />;
    }

    return (
      <main className="gifs-grid__content">
        {props.gifs.map((gif: Gif) => (
          <div className="gifs-grid__item" key={gif.images.original.url}>
            <img
              className="gifs-grid__gif"
              src={gif.images.original.url}
              alt={gif.title}
              loading="lazy"
            />
            <FavButton active={false} />
          </div>
        ))}
      </main>
    );
  }, [props.loading, props.gifs]);

  return (
    <section className="gifs-grid">
      {props.title && <h1 className="gifs-grid__title">{props.title}</h1>}
      {GifsGridContent}
    </section>
  );
};

export default GifsGrid;
