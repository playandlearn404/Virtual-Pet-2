class Food{
    constructor() {
        this.image = loadImage("./images/Milk.png");
    }
    getStock() {
        var stock = database.ref('Food');
        stock.on("value",function(data) {
            stock = data.val();
        });
    }
    updateStock(updatedStock) {
        database.ref('/').update({
            Food: updatedStock
        })
    }
    deductFood(stockDeduction) {
        database.ref('/').update({
            Food: x - stockDeduction
        })
    }
    addFood(stocktbAdded) {
        database.ref('/').update({
            Food: x + stocktbAdded
        })
    }
    display() {
        var x = 80, y = 100;
        imageMode(CENTER);
        image(this.image, 720, 220, 70, 70);
        if(foodS != 0) {
            for(var i = 0; i < foodS; i++) {
                if(i % 10 == 0) {
                    x = 100;
                    y += 70;
                }
                image(this.image, x, y, 50, 50);
                x += 50;
            }
        }
    }
}
