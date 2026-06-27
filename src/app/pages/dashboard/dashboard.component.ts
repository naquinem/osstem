import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentsService } from 'src/app/services/components.service';
import { WithdrawalService } from 'src/app/services/withdrawal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
 parts: any = [];

  constructor(private partsService: ComponentsService,
    private authService: AuthService,
    private router: Router,
    private withdrawalService: WithdrawalService
  ) {}

  ngOnInit(): void {
    this.loadParts();
  }

  loadParts() {
    this.partsService.getAll().subscribe(res => {
      this.parts = res;
    });
  }
  loading = false;

  logout() {
    this.loading = true;

    this.authService.logout().subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['/']);
      },
      error: () => {
        localStorage.clear();
        this.router.navigate(['/']);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
  requestPart(part:any)
  {
    if(!part.requestQty)
    {
      alert('Enter quantity');
      return;
    }

    if(part.requestQty > part.quantity)
    {
      alert('Quantity exceeds stock');
      return;
    }

    this.withdrawalService.request({

      part_id: part.id,

      quantity_requested:
        part.requestQty

    }).subscribe({

      next:(res:any)=>{

        alert(res.message);

        part.requestQty = '';

      },

      error:(err)=>{

        alert(
          err.error.message
        );

      }

    });
  }
}
