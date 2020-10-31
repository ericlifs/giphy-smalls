import React, { useMemo } from 'react';
import { Gif } from 'interfaces';
import { GifImage, LoadingSpinner } from 'ui';
import './index.scss';

interface GifsGridProps {
  title: string;
  loading: boolean;
  gifs: Gif[];
}

const GifsGrid: React.FC<GifsGridProps> = (props: GifsGridProps) => {
  // Called when a gif image gets clicked
  const onImageClicked = (gif: Gif) => {
    window.open(gif.images.original.url, '_blank');
  };

  const GifsGridContent = useMemo(() => {
    // If it's loading we return the LoadingSpinner
    if (props.loading) {
      return <LoadingSpinner />;
    }

    // If the search didnt throw any result we return a title
    if (props.gifs.length === 0) {
      return <h3 className="gifs-grid__no-results">We could not find any gif :(</h3>;
    }

    // If we do have results we return the gifs grid
    return (
      <main className="gifs-grid__content">
        {props.gifs.map((gif: Gif) => (
          <GifImage key={gif.id} gif={gif} onImageClicked={onImageClicked} />
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
