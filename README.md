# S.S. JS

## JSS-like API on top of Aphrodite

All aboard the S.S. JS, to a land where we put CSS in our JavaScript!

This project is a merge of ideas from [JSS](https://github.com/cssinjs/jss) and [Aphrodite](https://github.com/Khan/aphrodite). It provides the API of JSS but uses Aphrodite under the hood to do the actual rendering of styles.

## Example

```js
import ssjs from 'ssjs'

const sheet = ssjs.createStyleSheet({
  button: {
    border: '1px solid',
    borderRadius: 5,
    fontSize: 'inherit',
    lineHeight: '2.3em',
    padding: '0 1em',
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    textShadow: '0 -1px 0 rgba(0, 0, 0, 0.25)',
    backgroundRepeat: 'repeat-x',
    color: '#fff',
    fontWeight: 400,
  },
  primaryButton: {
    extend: 'button',
    borderColor: '#1177cd #0f6ab6 #0d5c9e',
    backgroundImage: 'linear-gradient(to bottom, #2591ed 0%, #1177cd 100%)',
    backgroundColor: '#1385e5',
    '&:hover': {
      backgroundImage: 'linear-gradient(to bottom, #3c9def 0%, #1385e5 100%)'
    }
  },
  inner: {
    marginRight: 5,
    color: '#fff'
  },
});
sheet.attach();

document.body.innerHTML = `
  <button class="${sheet.classes.primaryButton}">
    <span class="${sheet.classes.inner}">&#10004;</span>Primary
  </button>
`;
```

## API

### Create a style sheet

```js
ssjs.createStyleSheet(styles)
```

Then, the stylesheet can be attached to make it generate styles. The stylesheet
must be attached for things to work.

```js
const sheet = ssjs.createStyleSheet(styles);
sheet.attach();
```

### Use styles

Class names for the keys in your styles can be found on `sheet.classes`.

Styles will only be inserted into the DOM when the key on `sheet.classes` is
accessed.

## TODO

- @media
- @keyframes
- @font-face

## License

MIT
