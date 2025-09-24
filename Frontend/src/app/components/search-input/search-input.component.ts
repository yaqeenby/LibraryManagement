import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  standalone: false
})
export class SearchInputComponent implements OnInit, OnDestroy {
  @Input() placeholder = 'Search...';
  @Input() suggestions: string[] = []; // optional static suggestions
  @Input() debounce = 300; // ms
  @Output() search = new EventEmitter<string>();
  @Output() suggestionSelected = new EventEmitter<string>();

  control = new FormControl('');
  filteredOptions$!: Observable<string[]>;

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // stream for input changes
    this.filteredOptions$ = this.control.valueChanges.pipe(
      startWith(this.control.value || ''),
      debounceTime(this.debounce),
      distinctUntilChanged(),
      map(value => {
        const v = (value || '').toString().trim().toLowerCase();
        // emit the raw search term whenever after debounce
        this.search.emit(v);
        // filter suggestions for the autocomplete dropdown
        if (!v) { return this.suggestions.slice(0, 10); }
        return this.suggestions
          .filter(opt => opt.toLowerCase().includes(v))
          .slice(0, 10);
      }),
      takeUntil(this.destroy$)
    );
  }

  onClear() {
    this.control.setValue('');
    this.search.emit(''); // notify parent of clear
  }

  onOptionSelected(option: string) {
    this.control.setValue(option, { emitEvent: false }); // set without re-emitting valueChanges
    this.suggestionSelected.emit(option);
    this.search.emit(option); // also emit search with exact value
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
