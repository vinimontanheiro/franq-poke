const {IS_DEVELOPMENT} = require(`../constants`);

export const showLog = message => {
  if (IS_DEVELOPMENT) {
    console.log(message);
  }
};

export const replaceAll = (str, find, replace) => {
  return str.replace(new RegExp(find, `g`), replace);
};

export const parseMessageToTag = str =>
  replaceAll(str.split(`:`).pop().trim().toLowerCase(), ` `, `_`)
    .replace(/[,.\s]/g, ``)
    .replace(/[-\s]/g, `_`)
    .replace(/[/\s]/g, `_`);
