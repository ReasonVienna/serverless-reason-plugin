open Yojson.Basic.Util;

let jsonInput = Yojson.Basic.stream_from_channel stdin;

module Lambda = {
  let return json => print_endline (Yojson.Basic.to_string json);
  let run ::callback => {
    let jsonValue = Stream.next jsonInput;
    let body = `Assoc [("message", `String "Hello World!")];
    let stringBody = Yojson.Basic.to_string body;
    print_endline stringBody
    /* callback event::jsonValue */
  };
};
