import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InlineEditComponentComponent),
  multi: true
};

@Component({
  selector: 'app-inline-edit-component',
  templateUrl: './inline-edit-component.component.html',
  providers: [VALUE_ACCESSOR],
  styleUrls: ['./inline-edit-component.component.css']
})
export class InlineEditComponentComponent implements ControlValueAccessor {

  @Input() label = 'Enter value here';
  @Input() required = true;
  private _value = '';
  private preValue = '';
  private editing = false;
  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  get value(): any {
    return this._value;
  }

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  writeValue(value: any) {
    this._value = value;
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  onBlur($event: Event) {
    this.editing = false;
    if ( this._value === '') {
      this._value = 'No value available';
    }
  }

  beginEdit(value) {
    this.preValue = value;
    this.editing = true;
  }

}
