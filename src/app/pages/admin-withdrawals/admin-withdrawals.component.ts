import { Component } from '@angular/core';
import { WithdrawalService } from 'src/app/services/withdrawal.service';

@Component({
  selector: 'app-admin-withdrawals',
  templateUrl: './admin-withdrawals.component.html'
})
export class AdminWithdrawalsComponent {

  requests:any=[];

  constructor(
    private withdrawalService:
    WithdrawalService
  ){}

  ngOnInit()
  {
    this.load();
  }

  load()
  {
    this.withdrawalService
    .pending()
    .subscribe((res:any)=>{

      this.requests=res;

    });
  }

  approve(id:number)
  {
    this.withdrawalService
    .approve(id)
    .subscribe(()=>{

      alert('Approved');

      this.load();

    });
  }

  decline(id:number)
  {
    const remarks =
      prompt('Reason');

    this.withdrawalService
    .decline(id,remarks || '')
    .subscribe(()=>{

      alert('Declined');

      this.load();

    });
  }

}
