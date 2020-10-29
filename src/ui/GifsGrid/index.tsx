import React, { useMemo } from 'react';
import { Gif } from '../../interfaces/gifs';
import './index.scss';

interface GifsGridProps {
  title: string;
  loading: boolean;
  gifs: Gif[];
}

const GifsGrid: React.FC<GifsGridProps> = (props: GifsGridProps) => {
  const GifsGridContent = useMemo(() => {
    if (props.loading) {
      return <h1>Loading</h1>;
    }

    return (
      <main className="gifs-grid__content">
        {props.gifs.map((gif: Gif) => (
          <img
            className="gifs-grid__gif"
            key={gif.images.original.url}
            src={gif.images.original.url}
            alt={gif.title}
          />
        ))}
      </main>
    );
  }, [props.loading, props.gifs]);

  return (
    <section className="gifs-grid">
      <h1 className="gifs-grid__title">{props.title}</h1>
      {GifsGridContent}
    </section>
  );
};

export default GifsGrid;
