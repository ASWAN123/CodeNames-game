import randomWords from "random-words";
import words from "random-words";


const mywords = (x) => {


  let Team1Cards  = randomWords({ exactly: 8 , minLength:6 , maxLength: 10 }).map((word)=> {
    return {'word':word ,'flip':false , team:"Team 1" , color:'bg-[#347bdc]' , hover:[] }
  });

  let Team2Card  = randomWords({ exactly: 8 , minLength:6 , maxLength: 10 }).map((word)=> {
    return {'word':word ,'flip':false , team:"Team 2" , color:'bg-[#e81111]' , hover:[] }
  });

  let whiteCard = randomWords({ exactly: 8 , minLength:6 , maxLength: 10 }).map((word)=> {
    return {'word':word ,'flip':false , team:"f" , color:'bg-[#e4c3bd]' , hover:[] }
  }); 



  let blackCard  ;

  if(x == -1){
    blackCard = {'word':words() ,'flip':false , team:"x" , color:'bg-[#1e293b]' , hover:[] } ;
  }else{
    blackCard = {'word':words() ,'flip':false , team:"f" , color:'bg-[#e4c3bd]' , hover:[] } ;
  }
  


  let mywords = [...Team1Cards , ...Team2Card , ...whiteCard , blackCard ].map((word ,  index)=> {
    return {...word ,  'index':index}
  })

  // fix  the  issue  later  ,  about  generating  same  words 

  mywords.sort(() => 0.5 - Math.random())
  mywords.sort(() => 0.5 - Math.random())
  mywords.sort(() => 0.5 - Math.random())
  mywords.sort(() => 0.5 - Math.random())
  mywords.sort(() => 0.5 - Math.random())


  return mywords

}


export default mywords ;