const number = document.getElementById("input--number");
const range = document.getElementById("input--range");
const form = document.getElementById("password--form");
const passwordDisplay = document.getElementById("password--display");
const includeUppercase = document.getElementById("include--uppercase");
const includeNumbers = document.getElementById("include--numbers");
const includeSymbols = document.getElementById("include--symbols");

const asciiArray = (low, high) => {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
};

//ASCI Character Codes
const LOWERCASE_CHAR_CODES = asciiArray(97, 122);
const UPPERCASE_CHAR_CODES = asciiArray(65, 90);
const NUMBER_CHAR_CODES = asciiArray(48, 57);
const SYMBOL_CHAR_CODES = asciiArray(33, 47)
  .concat(asciiArray(58, 64))
  .concat(asciiArray(91, 96))
  .concat(asciiArray(123, 126));

const syncCharacterAmount = e => {
  const value = e.target.value;
  number.value = value;
  range.value = value;
};

const generatePassword = (quantity, uppercase, numbers, symbols) => {
  let charCodes = LOWERCASE_CHAR_CODES;
  if (uppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
  if (numbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
  if (symbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);

  const passwordCharacters = [];
  for (let i = 0; i < quantity; i++) {
    const character = charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(character));
  }
  return passwordCharacters.join('');
};

form.addEventListener("submit", e => {
  e.preventDefault();
  const quantity = number.value;
  const uppercase = includeUppercase.checked;
  const numbers = includeNumbers.checked;
  const symbols = includeSymbols.checked;
  const password = generatePassword(quantity, uppercase, numbers, symbols);
  passwordDisplay.innerHTML = password;
});

number.addEventListener("input", syncCharacterAmount);
range.addEventListener("input", syncCharacterAmount);
