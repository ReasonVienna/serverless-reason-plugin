open Yojson.Basic.Util;

/* open Lambda;

   let myFunction ::event => {
     let body = `Assoc [("message", `String "Hello World!")];
     let stringBody = Yojson.Basic.to_string body;
     let response = `Assoc [("statusCode", `Int 200), ("body", `String stringBody)];
     Lambda.return response
   };

   Lambda.run callback::myFunction; */
while true {
  let line = input_line stdin;
  let body = `Assoc [("message", `String line)];
  print_endline (Yojson.Basic.to_string body)
};
