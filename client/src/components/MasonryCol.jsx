import {
  arrayOf, objectOf, oneOfType, string,
} from 'prop-types';
import { nanoid } from 'nanoid';
import Image from './Image';

export default function MasonryCol({ col }) {
  const imageElems = col.map((image) => (
    <Image
      url={image.url}
      labels={image.labels}
      key={nanoid()}
    />
  ));
  return <div className="flex flex-col gap-6">{imageElems}</div>;
}

MasonryCol.propTypes = {
  col: arrayOf(objectOf(oneOfType([string, arrayOf(string)]))).isRequired,
};
