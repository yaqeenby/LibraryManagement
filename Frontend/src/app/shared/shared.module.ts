import { NgModule } from '@angular/core';
import { SearchInputComponent } from '../components/search-input/search-input.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../components/card/card.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogTemplateComponent } from '../components/dialog-template/dialog-template.component';
import { MatSelectModule } from '@angular/material/select';
import { ViewBooksComponent } from '../components/view-books/view-books.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddBookComponent } from '../components/add-book/add-book.component';

@NgModule({
  declarations: [
    SearchInputComponent,
    CardComponent,
    DialogTemplateComponent,
    AddBookComponent,
    ViewBooksComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule
  ],
  exports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    SearchInputComponent,
    CardComponent,
    MatDialogModule,
    DialogTemplateComponent,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    AddBookComponent,
    ViewBooksComponent
  ]
})
export class SharedModule { }
