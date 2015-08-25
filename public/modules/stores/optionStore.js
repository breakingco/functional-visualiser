const event = require('events');
import {map} from 'lodash';
import codeExamples from '../examples/examples.js';
import earlyDeliverable from '../../docs/earlyDeliverable.js';

/* simple event store / emitter singleton.
   I have done this without using the flux helper library
   as assistance, in order to understand the architecture
   of a callback registry / events emitter. */

function OptionStore() {
  const optionStore = Object.create(event.EventEmitter.prototype);
  const options = {};

  // read in available examples from constants file
  Object.assign(options, {
    visualization: {
      type: 'dynamic',
      dimensions: {
        width: 1000,
        height: 800
      },
    },
    clickedItem: null,
    codeExamples,
    markdown: {
      earlyDeliverable,
    },
    selectedMarkdown: null,
    staticCodeExample: null,
  });
  // TODO - just for testing, set to null initially
  options.staticCodeExample = options.codeExamples.assorted.fibonacciRecursive;

  function subscribeListener(callback) {
    optionStore.on('change', callback);
  }

  function unsubscribeListener(callback) {
    optionStore.removeListener('change', callback);
  }

  function setOptions(newOpts) {
    Object.assign(options, newOpts);
    optionStore.emit('change');
  }

  function getOptions() {
    return options;
  }

  return {
    subscribeListener,
    unsubscribeListener,
    setOptions,
    getOptions,
  };
}
export default new OptionStore;
