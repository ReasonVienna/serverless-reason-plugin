open Yojson.Basic.Util;

let lambdaHandler _ =>
  Yojson.Basic.from_channel stdin;

let lambdaReturn json =>
  Yojson.Basic.to_channel stdout json;

let json = lambdaHandler();
let person = `Assoc [ ("name", `String "Anil") ];
lambdaReturn(person)
