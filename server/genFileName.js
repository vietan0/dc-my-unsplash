function genFileName(originalname) {
  const name = originalname.match(/.+(?=\.\w+$)/)[0].replaceAll(' ', '-');
  const ext = originalname.match(/\.\w+$/)[0];
  const timeSuffix = new Date(Date.now()).toJSON().replaceAll(':', '-');

  const newName = `${name}-${timeSuffix}${ext}`;
  return newName;
}

// genFileName('Call Stack.jpg');

module.exports = genFileName;
