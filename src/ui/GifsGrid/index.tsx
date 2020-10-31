import React, { useMemo } from 'react';
import { Gif } from '../../interfaces/gifs';
import GifImage from '../GifImage';
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

    if (props.gifs.length === 0) {
      return <h3 className="gifs-grid__no-results">We could not find any gif :(</h3>;
    }

    return (
      <main className="gifs-grid__content">
        {props.gifs.map((gif: Gif) => (
          <GifImage key={gif.id} gif={gif} />
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
