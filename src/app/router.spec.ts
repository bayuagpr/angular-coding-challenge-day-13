/* tslint:disable:no-unused-variable */
import { Location } from "@angular/common";
import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { routes } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ProductAddComponent } from "./product-add/product-add.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";
import { ProductComponent } from "./product/product.component";

describe("Router: App", () => {
  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [
        ProductComponent,
        ProductDetailComponent,
        ProductEditComponent,
        ProductAddComponent
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });
  
  it('navigate to "products" takes you to /products', fakeAsync(() => {
    router.navigate(["/products"]).then(() => {
      expect(location.path()).toBe("/products");
    });
  }));
});
