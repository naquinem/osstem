import { Component } from '@angular/core';
import { WithdrawalService } from 'src/app/services/withdrawal.service';

@Component({
  selector: 'app-withdrawal-history',
  templateUrl: './withdrawal-history.component.html',
  styleUrls: ['./withdrawal-history.component.scss']
})
export class WithdrawalHistoryComponent {
  user: any = [];
  constructor(private withdrawalSerive: WithdrawalService){}
  ngOnInit(): void {
    this.loadParts();
  }
  loadParts(){
  this.withdrawalSerive.getUserWithdrawals().subscribe((res: any) => {
    this.user = res;
  })
}
}
