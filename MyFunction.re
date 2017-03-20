open Yojson.Basic.Util;

open Lambda;

let myFunction ::event => {
  let body = `Assoc [("message", `String "Hello World!")];
  let stringBody = Yojson.Basic.to_string body;
  let response = `Assoc [("statusCode", `Int 200), ("body", `String stringBody)];
  Lambda.return response
};

Lambda.run callback::myFunction;
