import { Component, Input, OnInit, inject } from '@angular/core';

import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarHorizontalPosition,
  MatSnackBarLabel,
  MatSnackBarRef,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'Toast',
  standalone: true,
  imports: [ MatFormFieldModule, MatSelectModule, MatButtonModule ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit {
    @Input() message: string = "";
    @Input() icon: string = "" // success, danger, info, warning
    @Input() fire: boolean = false
    private _snackBar = inject(MatSnackBar);

    ngOnInit(): void {
        if(this.fire) {
            this.openSnackBar()
        }
    }

    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    durationInSeconds = 5;
    openSnackBar() {
            this._snackBar.openFromComponent(Snackbar, {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: this.durationInSeconds * 1000,
            data: { message: this.message, icon: this.icon },
        });
    }
}

@Component({
    selector: 'snackBar-component',
    templateUrl: './snack-bar-component-snack.html',
    styles: `
        :host {
            display: flex;
        }
    
        .snackbar {
        }

        .success {
            background-color: green;
            color: green;
        }

        .danger {
            background-color: red;
            color: red;
        }

        .warning {
            background-color: yellow;
            color: yellow;
        }

        .info {
            background-color: blue;
            color: blue;
        }
    `,
    standalone: true,
    imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction, CommonModule],
  })

  export class Snackbar {
    snackBarRef = inject(MatSnackBarRef);
    data = inject(MatSnackBarRef).containerInstance.snackBarConfig.data;
    icon = inject(MatSnackBarRef).containerInstance.snackBarConfig.data.icon;
}