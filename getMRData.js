const keyvaluestore = require("./models/keyvaluestore.js")
const users = new keyvaluestore("users")
const friends = new keyvaluestore("friends")
const fs = require('fs')
users.init(function(err, data){})
friends.init(function(errF, dataF){})

    users.scanKeys(function(err, data){
        if(err){
            console.log("Error", err);
        }else if (!data){
            console.log("No data in table");
        } else {
            let output  = '';
            for(let i = 0; i < data.length; i++){
                output += data[i].key; 
                output += ':'; 
                friends.get(data[i].key, function(err2, data2){
                    if(err2){
                        console.log("error retrieving friends", err2);
                    } else if (!data2){
                        console.log("no friend data");
                    } else {
                        console.log("data2lengthis" + data2.length);
                        for (let k = 0; k < data2.length; k++){
                            
                            output += data2[i].value;
                            output += ",";
                        }
                    }
                });
                let values = JSON.parse(data[i].value);
                let interests = values.interests;
                for(let j = 0; j < interests.length; j++){
                    output += interests[j];
                    output += ',';
                }
                let affiliation = values.affiliation;
                output += affiliation; 
                output += '\n';
    
            }
    
            fs.writeFile('recsInput.txt', output, (err) => {
                if (err) throw err;
                console.log('Data successfully retrieved from database!');
            });
        }
    })




