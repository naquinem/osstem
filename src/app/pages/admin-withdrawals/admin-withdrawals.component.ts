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
  approve(request: any)
  {
    const trackingNumber = prompt(
      'Enter LBC Tracking Number'
    );

    // Cancel user
    if (trackingNumber === null) {
      return;
    }

    // Blank input
    if (!trackingNumber.trim()) {

      alert('Tracking Number is required.');

      return;

    }

    this.withdrawalService
      .approve(
        request.id,
        trackingNumber.trim()
      )
      .subscribe(() => {

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
