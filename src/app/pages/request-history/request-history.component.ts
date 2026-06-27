import { Component } from '@angular/core';
import { WithdrawalService } from 'src/app/services/withdrawal.service';

@Component({
  selector: 'app-request-history',
  templateUrl: './request-history.component.html',
  styleUrls: ['./request-history.component.scss']
})
export class RequestHistoryComponent {

  requests:any=[];

  constructor(
    private withdrawalService: WithdrawalService
  ){}

  ngOnInit()
  {
    this.load();
  }

  load()
  {
    this.withdrawalService
    .myRequests()
    .subscribe((res:any)=>{

      this.requests=res;

    });
  }

}
