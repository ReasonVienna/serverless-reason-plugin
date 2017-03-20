open Yojson.Basic.Util;

open Lambda;

let myFunction ::event => {
  let name = event |> member "queryStringParameters" |> member "name" |> to_string;
  /* TODO make it safe using pattern matching */
  /* let queryKeys = Yojson.Basic.Util.keys(event |> member "queryStringParameters")
     let checkForName = List.exists(item => item == "name")
     let x = ["name"]; */
  let body = `Assoc [("message", `String ("Hello " ^ name ^ "!"))];
  let stringBody = Yojson.Basic.to_string body;
  let response = `Assoc [("statusCode", `Int 200), ("body", `String stringBody)];
  Lambda.return response
};

Lambda.run callback::myFunction;
