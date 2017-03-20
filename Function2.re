open Yojson.Basic.Util;

let lambdaReturn json => Yojson.Basic.to_channel stdout json;

let lambdaHandler ::callback => {
  let jsonInput = Yojson.Basic.from_channel stdin;
  callback event::jsonInput
};

let myFunction ::event => {
  let person = `Assoc [("name", `String "Anil")];
  lambdaReturn person
};

lambdaHandler callback::myFunction;
