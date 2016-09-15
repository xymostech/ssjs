import asap from 'asap';
import {assert} from 'chai';
import jsdom from 'jsdom';
import {StyleSheetTestUtils} from 'aphrodite';

import ssjs from '../src/index';

describe('ssjs', () => {
    beforeEach(() => {
        global.document = jsdom.jsdom();
    });

    afterEach(() => {
        global.document.close();
        global.document = undefined;
        StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    });

    describe('createStyleSheet', () => {
        it('makes a stylesheet and adds it to the dom', done => {
            const styles = {
                red: {
                    color: 'red',
                },
            };

            const sheet = ssjs.createStyleSheet(styles);
            sheet.attach();

            sheet.classes.red;

            asap(() => {
                const styleTags = global.document.getElementsByTagName("style");
                const lastTag = styleTags[styleTags.length - 1];

                assert.include(lastTag.textContent, `${sheet.classes.red}{`);
                assert.include(lastTag.textContent, "color:red");

                done();
            });
        });

        it('supports extending styles', done => {
            const styles = {
                red: {
                    color: 'red',
                },

                small: {
                    extend: 'red',
                    width: 0,
                },
            };

            const sheet = ssjs.createStyleSheet(styles);
            sheet.attach();

            sheet.classes.small;

            asap(() => {
                const styleTags = global.document.getElementsByTagName("style");
                const lastTag = styleTags[styleTags.length - 1];

                assert.include(lastTag.textContent, `${sheet.classes.small}{`);
                assert.include(lastTag.textContent, "color:red;width:0");

                done();
            });
        });

        it("doesn't insert styles for unused selectors", () => {
            const styles = {
                red: {
                    color: 'red',
                },
            };

            const sheet = ssjs.createStyleSheet(styles);
            sheet.attach();

            asap(() => {
                const styleTags = global.document.getElementsByTagName("style");
                assert.equal(styleTags.length, 0);

                done();
            });
        });
    });
});
