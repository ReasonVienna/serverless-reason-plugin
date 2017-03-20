open Yojson.Basic.Util;

let lambdaReturn json => Yojson.Basic.to_channel stdout json;

let jsonInput = Yojson.Basic.from_channel stdin;

let lambdaHandler ::callback => callback event::jsonInput;

let person = `Assoc [("name", `String "Anil")];

/* let myFunction ::event => lambdaReturn person; */
let myFunction ::event => lambdaReturn person;

lambdaHandler callback::myFunction;
