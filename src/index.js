import {StyleSheet, css} from 'aphrodite/no-important';

const createStyleSheet = (styles) => {
    const classes = {};

    return {
        attach() {
            const filteredStyles = {};

            Object.keys(styles).forEach(key => {
                const {
                    extend: _,
                    ...otherStyles,
                } = styles[key];

                filteredStyles[key] = otherStyles;
            });

            const stylesheet = StyleSheet.create(filteredStyles);

            Object.keys(styles).forEach(key => {
                let extend = styles[key].extend;

                const extensions = [];
                while (extend) {
                    extensions.push(stylesheet[extend]);
                    extend = styles[extend].extend;
                }

                Object.defineProperty(classes, key, {
                    enumerable: true,
                    get() {
                        return css(...extensions, stylesheet[key]);
                    }
                });
            });
        },

        classes,
    };
};

export default {
    createStyleSheet,
};
