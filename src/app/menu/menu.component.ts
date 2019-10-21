import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/services/data.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  selectedDay = 'Monday';
  mode = 'info';
  selectedDayMenu: any;
  type:any;
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.getMenu();
  }

  getMenu(){
    let url = '/v1/menus/weekly_menu?day='+ this.days.indexOf(this.selectedDay);
    this.dataService.get(url).subscribe((data:any) => {
      this.selectedDayMenu = data;
    });
  }

  selectDay(day){
    this.selectedDay = day;
    this.getMenu();
  }

}
