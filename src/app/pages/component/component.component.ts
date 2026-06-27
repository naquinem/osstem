import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html'
})
export class ComponentComponent implements OnInit {

  parts: any = [];
  user: any = null;

  formData = {
    id: null,
    itemCode: '',
    description: '',
    part: '',
    quantity: '',
    price: '',
    image: null as File | null
  };

  isEdit = false;
  loading = false;

  //ALERT STATE
  alertMessage: string = '';
  alertType: 'success' | 'error' | '' = '';

  constructor(
    private partsService: ComponentsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadParts();

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  loadParts() {
    this.partsService.getAll().subscribe(res => {
      this.parts = res;
    });
  }

  onFileChange(event: any) {
    this.formData.image = event.target.files[0];
  }

  //ALERT FUNCTION
  showAlert(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;

    setTimeout(() => {
      this.alertMessage = '';
      this.alertType = '';
    }, 3000);
  }

  submit() {
    const fd = new FormData();

    fd.append('itemCode', this.formData.itemCode);
    fd.append('description', this.formData.description);
    fd.append('part', this.formData.part);
    fd.append('quantity', this.formData.quantity);
    fd.append('price', this.formData.price);

    if (this.formData.image) {
      fd.append('image', this.formData.image);
    }

    const request = this.isEdit && this.formData.id
      ? this.partsService.update(this.formData.id, fd)
      : this.partsService.create(fd);

    request.subscribe({
      next: () => {
        this.showAlert(
          this.isEdit ? 'Successfully updated part!' : 'Successfully created part!',
          'success'
        );

        this.reset();
        this.loadParts();
      },
      error: (err) => {
        const message =
          err?.error?.message ||
          err?.error ||
          err?.message ||
          'Something went wrong';

        this.showAlert(message, 'error');
      }
    });
  }

  edit(part: any) {
    this.isEdit = true;

    this.formData = {
      id: part.id,
      itemCode: part.itemCode,
      description: part.description,
      part: part.part,
      quantity: part.quantity,
      price: part.price,
      image: null
    };
  }

  delete(id: number) {
    this.partsService.delete(id).subscribe({
      next: () => {
        this.showAlert('Deleted successfully!', 'success');
        this.loadParts();
      },
      error: () => {
        this.showAlert('Delete failed!', 'error');
      }
    });
  }

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

  reset() {
    this.isEdit = false;

    this.formData = {
      id: null,
      itemCode: '',
      description: '',
      part: '',
      quantity: '',
      price: '',
      image: null
    };
  }
}
