// alexa-cookbook.js
/* eslint-disable  no-console */
// *eslint : extend airbnb

// all items here should not be touched other then the "speechcons". 

const cookbookVersion = 0.01;

const speechcons = [ ];
//
// exported module
//
module.exports = {
  version: cookbookVersion,
  //
  // Core Voice UI Helpers
  //
  getRandomItem(arrayOfItems) {
    // can take an array, or a dictionary
    if (Array.isArray(arrayOfItems)) {
      // the argument is an array []
      let i = 0;
      i = Math.floor(Math.random() * arrayOfItems.length);
      return (arrayOfItems[i]);
    }

    if (typeof arrayOfItems === 'object') {
      // argument is object, treat as dictionary
      const result = {};
      const key = this.getRandomItem(Object.keys(arrayOfItems));
      result[key] = arrayOfItems[key];
      return result;
    }
    // not an array or object, so just return the input
    return arrayOfItems;
  },
  getFormattedList(arrayOfListItems, penultimateWord = 'and') {
    // the first argument is an array [] of items
    // the second argument is the list penultimate word; and/or/nor etc.  Default to 'and'
    let result = '';
    arrayOfListItems.forEach((element, index, arr) => {
      if (index === 0) {
        result = element;
      } else if (index === arr.length - 1) {
        result += ` ${penultimateWord} ${element}`;
      } else {
        result += `, ${element}`;
      }
    });
    return result;
  },
  wrapSpeehconsInSSML(textToSearch) {
    // if the text contains a speechcon, add the proper SMML around the speechcon
    let text = textToSearch;
    speechcons.forEach((element) => {
      const elementWithSSML = `,<say-as interpret-as="interjection">${element}</say-as>,`;
      text = text.replace(element, elementWithSSML);
    });
    return text;
  },
  isSlotValid(request, slotName) {
    if (request &&
      request.intent &&
      request.intent.slots &&
      request.intent.slots[slotName] &&
      request.intent.slots[slotName].value) {
      const slotValue = request.intent.slots[slotName].value;
      if (slotValue !== '') {
        return true;
      }
    }
    return false;
  },
  //
  // Display Related Helpers
  //
  display: {
    supportsDisplay(event) {
      if (event.context &&
        event.context.System &&
        event.context.System.device &&
        event.context.System.device.supportedInterfaces &&
        event.context.System.device.supportedInterfaces.Display) {
        return true;
      }
      return false;
    },
  },
};
