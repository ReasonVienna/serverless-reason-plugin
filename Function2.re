open Lambda;

let myFunction ::event => {
  let person = `Assoc [("name", `String "Anil")];
  Lambda.lambdaReturn person
};

Lambda.lambdaHandler callback::myFunction;
