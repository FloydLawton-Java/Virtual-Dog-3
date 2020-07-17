class Food{
  constructor(){
  this.foodStock=0;
  this.lastFed;
  this.image1=loadImage('images/milk.png');
  this.dog3=loadImage("images/Wash Room.png");
  this.dog4=loadImage("images/Bed Room.png");
  this.dog5=loadImage("images/Garden.png"); 
  }

  getState(){
    readState= database.ref("gameState");
    readState.on("value", function(data){
      gameState= data.val();
    })
  }
  updateFoodStock(foodStock){
      this.foodStock=foodStock;
     }
  
     getFeedTime(lastFed){
       this.lastFed=lastFed;
     }
  
     deductFood(){
       if(this.foodStock>0){
        this.foodStock-=1;
       }
      }
  
      getFoodStock(){
        return this.foodStock;
      }
      bedroom(){
        background(this.dog4, 550, 500);
      }
      washroom(){
        background(this.dog3, 550, 500);
      }
      garden(){
        background(this.dog5, 550, 500);
      }
  
      display(){
        var x=80,y=100;
        
        imageMode(CENTER);
        image(this.image1,720,220,70,70);
       
        if(this.foodStock!=0){
          for(var i=0;i<this.foodStock;i++){
            if(i%10==0){
              x=80;
              y=y+50;
            }
            image(this.image,x,y,50,50);
            x=x+30;
          }
        }
      }
}