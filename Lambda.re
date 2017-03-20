open Yojson.Basic.Util;

module Lambda = {
  let return json => print_endline (Yojson.Basic.to_string json);
  let run ::callback =>
    while true {
      let line = input_line stdin;
      let jsonValue = Yojson.Basic.from_string line;
      callback event::jsonValue
    };
};
