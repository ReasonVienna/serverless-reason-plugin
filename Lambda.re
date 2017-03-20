open Yojson.Basic.Util;

module Lambda = {
  let return json => Yojson.Basic.to_channel stdout json;
  let run ::callback => {
    let jsonInput = Yojson.Basic.from_channel stdin;
    callback event::jsonInput
  };
};
