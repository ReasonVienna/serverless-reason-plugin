open Lambda;

let myFunction ::event => {
  let person = `Assoc [("name", `String "Anil")];
  Lambda.return person
};

Lambda.run callback::myFunction;
