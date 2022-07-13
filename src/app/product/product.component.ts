import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any = [];

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.products = [];
    this.rest.getProducts().subscribe((data: {}) => {
      console.log(data);
      this.products = data;
    });
  }

  async add() {
    await this.router.navigate(['/product-add']);
  }

  delete(id: number) {
    this.rest.deleteProduct(id)
      .subscribe({
          next: res => {
            this.getProducts();
          }, error: (err) => {
            console.log(err);
          }
        }
      );
  }

}
