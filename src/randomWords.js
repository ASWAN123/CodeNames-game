import randomWords from "random-words";
import words from "random-words";


let Team1Cards  = randomWords({ exactly: 8 , minLength:6 , maxLength: 10 }).map((word)=> {
  return {'word':word ,'flip':false , team:"Team 1" , color:'bg-[#ec4899]' , hover:[] }
})

let Team2Card  = randomWords({ exactly: 8 , minLength:6 , maxLength: 10 }).map((word)=> {
  return {'word':word ,'flip':false , team:"Team 1" , color:'bg-[#6366f1]' , hover:[] }
});
let whiteCard = randomWords({ exactly: 8 , minLength:6 , maxLength: 10 }).map((word)=> {
  return {'word':word ,'flip':false , team:"Team 2" , color:'bg-[#cbd5e1]' , hover:[] }
}); ;
let blackCard  = {'word':words() ,'flip':false , team:"Team 1" , color:'bg-[#1e293b]' , hover:[] }

let mywords = [...Team1Cards , ...Team2Card , ...whiteCard , blackCard].sort(() => 0.5 - Math.random())


mywords.sort(() => 0.5 - Math.random())
mywords.sort(() => 0.5 - Math.random())
mywords.sort(() => 0.5 - Math.random())
mywords.sort(() => 0.5 - Math.random())
mywords.sort(() => 0.5 - Math.random())


export default mywords ;