import { createContext, useEffect, useMemo, useState } from 'react';
import { node } from 'prop-types';
import defaultPhotos from '../defaultPhotos';

export const MainContext = createContext();

export default function MainContextProvider({ children }) {
  const [images, setImages] = useState(
    localStorage.getItem('images') ? JSON.parse(localStorage.getItem('images')) : defaultPhotos,
  );
  const [imageViewOpen, setImageViewOpen] = useState({});
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    localStorage.setItem('images', JSON.stringify(images));
  }, [images]);

  const passedVals = useMemo(
    () => ({
      images,
      setImages,
      imageViewOpen,
      setImageViewOpen,
      searchInput,
      setSearchInput,
    }),
    [images, setImages, imageViewOpen, setImageViewOpen, searchInput, setSearchInput],
  );
  return <MainContext.Provider value={passedVals}>{children}</MainContext.Provider>;
}

MainContextProvider.propTypes = { children: node.isRequired };
