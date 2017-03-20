open Yojson.Basic.Util;

module Lambda = {
  let return json => {
    Yojson.Basic.to_channel stdout json;
    exit 0
  };
  let run ::callback => {
    let jsonInput = Yojson.Basic.from_channel stdin;
    callback event::jsonInput
  };
};
