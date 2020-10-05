const ValidatorPizzaClient = require("validator-pizza-node");

const emailVerifier = new ValidatorPizzaClient().validate;

emailVerifier("email", "omkar@gmail.com")
    .then(validated => {
        console.log(JSON.stringify(validated.data));
        console.log(validated.field());
        console.log(validated.successful());
        console.log(validated.valid());
    })
    .catch(falseEmail => {
        console.log("ERROR");
        console.log(falseEmail);
    });

// (async() => {
//     try {
//         const reply = await emailVerifier("email", "abc@omkarrawal.codes");
//         console.log(reply.data);
//         console.log(reply.field());
//         console.log(reply.successful());
//         console.log(reply.valid());
//     } catch (error) {
//         console.log(error)
//     }
// })()