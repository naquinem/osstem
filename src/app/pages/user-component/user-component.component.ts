import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentsService } from 'src/app/services/components.service';
import { WithdrawalService } from 'src/app/services/withdrawal.service';

@Component({
  selector: 'app-user-component-show',
  templateUrl: './user-component.component.html'
})
export class UserComponentShowComponent implements OnInit {

  part: any = null;
  requestQty: number = 1;

  constructor(
    private route: ActivatedRoute,
    private service: ComponentsService,
    private withdrawalService: WithdrawalService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadPart(id);
  }

  loadPart(id: number) {

    this.service.get(id).subscribe({
      next: (res: any) => {

        this.part = res;

      },
      error: (err) => {

        console.error(err);

      }
    });

  }

  requestPart() {

    if (!this.requestQty || this.requestQty <= 0) {

      alert('Please enter valid quantity');
      return;

    }

    if (this.requestQty > this.part.quantity) {

      alert('Requested quantity exceeds available stock');
      return;

    }

    const payload = {

      part_id: this.part.id,
      quantity_requested: this.requestQty

    };

    this.withdrawalService.request(payload)
      .subscribe({

        next: (res: any) => {

          alert(res.message);

          this.requestQty = 1;
          this.router.navigate(['/component']);

        },

        error: (err) => {

          alert(
            err?.error?.message ||
            'Request failed'
          );

        }

      });

  }

}
