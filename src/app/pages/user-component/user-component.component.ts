import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-user-component-show',
  templateUrl: './user-component.component.html'
})
export class UserComponentShowComponent implements OnInit {

  part: any = [];

  constructor(
    private route: ActivatedRoute,
    private service: ComponentsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.get(id).subscribe(res => {
      this.part = res;
      console.log(res);
    });
  }
}
