import isUrl from 'is-url';

const str1 = 'https://developer.mozilla.org/en-US/docs/Web/API/URL/URL';
const str2 = 'https//developer.mozilla.org/en-US/docs/Web/API/URL/U';
const str3 = 'cats';

try {
  console.log(isUrl(str1));
  console.log(isUrl(str2));
  console.log(isUrl(str3));
} catch (err) {
  console.log(err.message);
}
