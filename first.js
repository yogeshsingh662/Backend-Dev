console.log("Node.js Backend Started");

let name ="Shashank"; // Make a String Variable
let age=20;  // Make a int Variable
const country = "India"; // Make a global Variable
let isStudent = true;  // Make a Boolean Variable

console.log(name);
console.log(age);
console.log(country); // this print or give O/P
console.log(isStudent);

let a = 10;
let b = 5;

console.log("Add:" , a + b); // This add the Two No.
console.log("Sub:" , a - b); //This subtract the Two No.
console.log("Mul:" , a * b); //This multiply the Two No.
console.log("Div:" , a / b); //This divide the Two No.

let loginAge = 18;

if(loginAge >= 18){    // this check the condition if this satisfy the condition then print 
    console.log("Allowed to Login");
}
else{           
    console.log("Not Allowed");
}


// Loop
for(let i = 1; i <= 5; i++){
    console.log("Loop Count:",i);
}

// Function
function add(x,y){
    return x+y;
}

let result = add(20,30);
console.log("Function Result:" , result);


// Simple Backend login
const admin = {
    username:"Admin",
    password:"1234"
};


function login(user,pass){
    if(user ===admin.username && pass === admin.password ){
        console.log("login Successful");
    }else{
        console.log("Invalid username or password");
    }
}
login("admin","1234");