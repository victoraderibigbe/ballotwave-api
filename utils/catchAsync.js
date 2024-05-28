// const saySomething = (something) => {
//   return something;
// };

// const catchAsync = () => {
//   const say = "Hello";
//   console.log(saySomething(say));
// };

// catchAsync();

// const saySomething = (something, username) => {
//   const obj = { by: username, message: something };
//   return obj;
// };
// console.log(saySomething(undefined, "Joshabam").message);

// const saySomething = (something, username) => {
//   const obj = { by: username, message: something };
//   return obj;
// };
// const triggerSaySomething = (something, username) => {
//   // saySomething("hello world");
//   return saySomething(something, username);
// };

// console.log(triggerSaySomething("Hey there", "John Doe"));

// const controller = async (req, res, next) => {
//   // Error("An error occured");
//   // console.log(user)
//   // throw {name: "JOSHMABError", message: "one more"}
//   throw Error("An error occured");
//   // jkjk
//   // djdk
//   // await UserActivation.find()
// };
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      console.log(err);
      next(err)
    });
  };
};
module.exports = catchAsync;
// catchAsync(async (req, res, next) => {
// //   throw Error("JoshBam Error Occured");
// })();
