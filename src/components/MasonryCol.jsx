import { arrayOf, objectOf, oneOfType, string } from 'prop-types';
import ImageCard from './ImageCard';

export default function MasonryCol({ col }) {
  const imageElems = col.map((image, i) => (
    <ImageCard
      url={image.url}
      labels={image.labels}
      index={i}
      key={image.url}
    />
  ));
  return <div className="flex flex-col gap-6">{imageElems}</div>;
}

MasonryCol.propTypes = { col: arrayOf(objectOf(oneOfType([string, arrayOf(string)]))).isRequired };
