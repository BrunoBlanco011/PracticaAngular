import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DepartmentService } from '../../../service/department.service';
import { AlertComponent } from '../../../resuableComponent/alert/alert.component';
import { MyButtonComponent } from '../../../resuableComponent/my-button/my-button.component';
import { ConfirmDialogComponent } from '../../../confirm-dialog/confirm-dialog.component';
import { Department, IDepartmentList } from '../../../model/class/Customer';
import { JsonPipe } from '@angular/common';
import { NaPipe } from '../../../pipes/na.pipe';
import { InterceptorErrorInterceptor } from '../../../interceptor/interceptor-error.interceptor';

@Component({
  selector: 'app-post-api',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    AlertComponent,
    MyButtonComponent,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NaPipe,
  ],
  templateUrl: './post-api.component.html',
  styleUrls: ['./post-api.component.css'],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorErrorInterceptor, multi: true },
  ]
})
export class PostAPIComponent implements OnInit {
  deptObj: Department = new Department();
  deptList: IDepartmentList[] = [];
  http = inject(HttpClient);
  dialog = inject(MatDialog);
  displayedColumns: string[] = ['srNo', 'name', 'logo', 'action'];
  dataSource = new MatTableDataSource<IDepartmentList>(this.deptList);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private deptSrv: DepartmentService) { }

  ngOnInit(): void {
    this.getDepartment();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onEdit(data: any) {
    this.deptObj = new Department();
    this.deptObj = data;
  }

  getData(data: any) {
    debugger;
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.delete(`https://projectapi.gerasim.in/api/Complaint/DeletedepartmentBydepartmentId?departmentId=${id}`).subscribe((res: any) => {
          if (res.result) {
            alert("Department Deleted Success");
            this.getDepartment();
          } else {
            alert(res.message);
          }
        });
      }
    });
  }

  onSave() {
    this.deptSrv.saveNewDept(this.deptObj).subscribe((res: any) => {
      if (res.result) {
        alert("Department Created Success");
        this.getDepartment();
      } else {
        alert(res.message);
      }
    });
  }

  onUpdate() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.post("https://projectapi.gerasim.in/api/Complaint/UpdateDepartment", this.deptObj).subscribe((res: any) => {
          if (res.result) {
            alert("Department Updated Success");
            this.getDepartment();
          } else {
            alert(res.message);
          }
        });
      }
    });
  }

  getDepartment() {
    this.deptSrv.getAllDept().subscribe((res: any) => {
      this.deptList = res.data;
      this.dataSource.data = this.deptList;
    });
  }
}
