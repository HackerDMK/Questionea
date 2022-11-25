document.getElementById("b1e1").innerHTML = "Testemail@mail.in";
document.getElementById("b1q1").innerHTML = "This a a question";
document.getElementById("b1d1").innerHTML = "This is the description of the question";
document.getElementById("b1c1").innerHTML = "8";
document.getElementById('b1dt1').innerHTML = "gdrhr";
String username = (String) document.get("username");  //if the field is String
Boolean b = (Boolean) document.get("isPublic");       //if the field is Boolean
Integer i = (Integer) document.get("age")

import { doc, getDoc} from "firebase/firestore"; 

const ref = doc(db, "Questions", email).withConverter(cityConverter);
const docSnap = await getDoc(ref);
if (docSnap.exists()) {
  // Convert to City object
  const city = docSnap.data();
  // Use a City instance method
  console.log(city.toString());
} else {
  console.log("No such document!");
}

const FinalDetails[4] = Details.toString()
  


class Data {
    constructor (Topic, Description, Counter, Date ) {
        this.Topic = Topic;
        this.Description = Description;
        this.Counter = Counter;
        this.Date = Date;
        document.getElementById("b1q1").innerHTML = this.Topic;
        document.getElementById("b1d1").innerHTML = this.Description;
        document.getElementById("b1c1").innerHTML = this.Counter;
        document.getElementById("b1dt1").innerHTML = this.Date;
         }
    toString() {
        return this.Topic  + ', ' + this.Description + ', ' + this.Counter + ', ' + this.Date;
    }
  }
  
  const databoxConverter = {
    toFirestore: (Data1) => {
        return {
            Topic: Data1.Topic,
            Description: Data1.Description,
            Counter: Data1.Counter,
            Date: Data1.Date
            };
    },
    fromFirestore: (snapshot, Title) => {
        const data = snapshot.data(Title);
        return new Data(data.Topic, data.Description, data.Counter, data.Date);
    }
  };
  const ref = doc(db, "Questions", "test@gmail.com").withConverter(databoxConverter);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    const Details = docSnap.data();
    const FinalDetails=Details.toString()
    console.log(FinalDetails);
    
  } else {
    console.log("No such document!");
  }
