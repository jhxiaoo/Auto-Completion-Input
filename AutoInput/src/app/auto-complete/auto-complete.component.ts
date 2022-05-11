import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Post } from '../services/posts';

@Component({
  selector: 'autocomplete-input',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
})
export class AutoCompleteComponent implements OnInit, AfterViewInit {
  @Output() onSelect = new EventEmitter<any>();

  isloading: boolean = false;
  inputbox = new FormControl();
  posts: Post[] = [];

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.getPost();
  }

  ngAfterViewInit() {
    this.inputbox.valueChanges
    .pipe(
      map(() => {
        this.isloading = true;
      })
    )
    .pipe(debounceTime(500))
    .subscribe(() => {
      this.getPost();
      this.isloading = false;
    });
  }

  onClick(name: string) {
    this.inputbox.setValue(name);
    this.getPost();
    this.onSelect.emit(name);
  }

  getPost() {
    this.auth.getItems(this.inputbox.value).subscribe((posts) => {
      this.posts = posts;
    });
  }
}
