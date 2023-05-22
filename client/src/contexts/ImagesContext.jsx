import {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { element } from 'prop-types';
import defaultPhotos from '../defaultPhotos';

export const ImagesContext = createContext();

export default function ImagesContextProvider({ children }) {
  const [images, setImages] = useState(localStorage.getItem('images') !== '[]' ? JSON.parse(localStorage.getItem('images')) : defaultPhotos); // array
  useEffect(() => {
    localStorage.setItem('images', JSON.stringify(images));
  }, [images]);

  const passedVals = useMemo(() => ({ images, setImages }), [images, setImages]);
  return <ImagesContext.Provider value={passedVals}>{children}</ImagesContext.Provider>;
}

ImagesContextProvider.propTypes = {
  children: element.isRequired,
};
