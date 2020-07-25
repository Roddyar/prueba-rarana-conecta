import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductoModel} from "../../models/ProductoModel";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductosService} from "../../services/productos.service";
import {ToastrService} from "ngx-toastr";

declare interface SelectRowInterface {
  productId: string;
  productName: string;
}

@Component({
  selector: 'table-cmp',
  moduleId: module.id,
  templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit {
  public headerRow: string[];
  selectedRowData: SelectRowInterface;
  dataRows: ProductoModel[] = [];
  editForm: FormGroup;
  register: FormGroup;
  closeResult = '';
  stockProducto = 0;
  idProducto = '';
  precioProducto = '';
  nombreProducto = '';

  constructor(private fb: FormBuilder, private modalService: NgbModal, private toastr: ToastrService,
              private personService: ProductosService) {
    this.editForm = this.fb.group({
      id: new FormControl(),
      nombre: new FormControl(),
      referencia: new FormControl(),
      precio: new FormControl(),
      peso: new FormControl(),
      categoria: new FormControl(),
      stock: new FormControl()
    });
  }

  ngOnInit() {
    this.headerRow = ['Id Producto', 'Nombre', 'Referencia', 'Categoría', 'Precio', 'Acciones'];

    this.register = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]],
      referencia: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]],
      precio: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      categoria: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]],
      stock: ['', [Validators.required]]
    });
    this.loadProducts();
  }

  loadProducts() {
    this.personService.GetProducts().subscribe(value => {
      this.dataRows = [...value]; // Refresh the data
    }, error => {
      this.showNotification(4, 'top', 'center', error.message);
    });
  }

  editRow(row) {
    this.editForm.setValue({
      id: row.id,
      nombre: row.nombre,
      referencia: row.referencia,
      precio: row.precio,
      peso: row.precio,
      categoria: row.categoria,
      stock: row.stock
    });
    this.selectedRowData = row;
  }

  deleteRow(row) {
    this.personService.DeletePerson(row.id).subscribe(value => {
        this.showNotification(2, 'top', 'center', 'Persona eliminada');
        this.loadProducts();
    }, error => {
      this.showNotification(4, 'top', 'center', error.message);
    });
  }

  open(content, form, row) {
    if (form)
      this.editRow(row);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onAddRowSave(form: FormGroup) {
    console.log(form.value);
    this.personService.CreateProduct(form.value).subscribe(value => {
      console.log(value);
      if (value){
        if (value.nombre === form.value.nombre) {
          this.loadProducts();
          form.reset();
          this.modalService.dismissAll();
          this.showNotification(2, 'top', 'center', 'Persona guardada');
        }
      }
    }, error => {
      this.showNotification(4, 'top', 'center', error.message);
    });
  }

  onEditSave(form: FormGroup) {
    this.personService.UpdateProduct(form.value.id, form.value).subscribe(value => {
      if (value){
          this.loadProducts();
          form.reset();
          this.modalService.dismissAll();
          this.showNotification(2, 'top', 'center', value.message);
      }
    }, error => {
      this.showNotification(4, 'top', 'center', error.message);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  showNotification(opc, from, align, text) {
    switch (opc) {
      case 1:
        this.toastr.info(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>'+ text + '</b></span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-info alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      case 2:
        this.toastr.success(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>'+ text + '</b></span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      case 3:
        this.toastr.warning(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>'+ text + '</b></span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-warning alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      case 4:
        this.toastr.error(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>'+ text + '</b></span>',
          "",
          {
            timeOut: 4000,
            enableHtml: true,
            closeButton: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      case 5:
        this.toastr.show(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>'+ text + '</b></span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-primary alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      default:
        break;
    }
  }

  openVenta(content, row) {
    this.stockProducto = row.stock;
    this.nombreProducto = row.nombre;
    this.precioProducto = row.precio;
    this.idProducto = row.id;
    console.log(this.stockProducto + ' - ' + this.idProducto);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onVentaSave() {
    const val = {stock: this.stockProducto - 1,
      uventa: new Date()};

    this.personService.UpdateProduct(this.idProducto, val).subscribe(value => {
      if (value){
        this.modalService.dismissAll();
        this.loadProducts();
        this.showNotification(2, 'top', 'center', value.message);
      }
    }, error => {
      this.showNotification(4, 'top', 'center', error.message);
    });
  }

}
