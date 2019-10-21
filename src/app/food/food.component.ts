import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/services/data.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {
  foodCategories: any;
  foodItems: any;
  newItem:any = {};

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getCategories();
    this.getItems();
  }


  getCategories(){
    let url = '/v1/menus/menu_categories';
    this.dataService.get(url).subscribe((data:any) => {
      this.foodCategories = data.categories;
    });
  }

  getItems(){
    let url = '/v1/items';
    this.dataService.get(url).subscribe((data:any) => {
      this.foodItems = data;
    });
  }

  addFoodItem(item){
    if(item && item != ""){
      let url = '/v1/items';
      let data = {
        item : item
      };
      this.dataService.post(url,data).subscribe((data:any) => {
        this.foodItems.push(data);
        this.newItem = {};
      });
    }
  }

  deleteItem(type,id,index){
    let url = type == 'item' ? "/v1/items/" : "/v1/menus/menu_categories/";
    url += id;
    this.dataService.delete(url).subscribe((data:any) => {
      type == 'item' ? this.foodItems.splice(index,1) : this.foodCategories.splice(index,1);
      console.log("item deleted : " + data);
    })
  }

}
