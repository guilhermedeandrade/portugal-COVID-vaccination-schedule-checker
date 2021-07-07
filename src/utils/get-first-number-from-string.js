import R from "ramda";
import isInteger from "./is-integer";

const getFirstNumberFromString = R.pipe(
  R.split(" "),
  R.map(parseInt),
  R.filter(isInteger),
  R.head
);

export default getFirstNumberFromString;
